import React from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../redux/products';
import PropTypes from 'prop-types';
import Treemap from './Treemap';
import * as d3 from 'd3';

const productCategories = [
  'produce',
  'meats',
  'dairy',
  'household',
  'frozen',
  'pasta',
  'seafood',
  'bakery',
  'baking',
  'medical',
  'office',
  'spices',
  'condiments',
  'bath',
  'miscellaneous',
];

function cascade(root, offset) {
  const x = new Map();
  const y = new Map();
  return root
    .eachAfter((d) => {
      if (d.children) {
        x.set(
          d,
          1 +
            d3.max(d.children, (c) => (c.x1 === d.x1 - offset ? x.get(c) : NaN))
        );
        y.set(
          d,
          1 +
            d3.max(d.children, (c) => (c.y1 === d.y1 - offset ? y.get(c) : NaN))
        );
      } else {
        x.set(d, 0);
        y.set(d, 0);
      }
    })
    .eachBefore((d) => {
      d.x1 -= 2 * offset * x.get(d);
      d.y1 -= 2 * offset * y.get(d);
    });
}

const treemap = (data) =>
  cascade(
    d3
      .treemap()
      .size([1000, 500])
      .paddingOuter(3)
      .paddingTop(19)
      .paddingInner(1)
      .round(true)(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value)
    ),
    3 // treemap.paddingOuter
  );

function cascadeData(data) {
  return {
    name: 'analytics',
    children: productCategories.map((category) => {
      return {
        name: category,
        children: data.filter((item) => item.category === category),
      };
    }),
  };
}

function chart(data) {
  const root = treemap(data);
  const color = d3.scaleSequential([8, 0], d3.interpolateMagma);
  const format = d3.format(',d');

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, 1000, 500])
    .style('overflow', 'visible')
    .style('font', '10px sans-serif');

  // const shadow = DOM.uid('shadow');

  svg
    .append('filter')
    // .attr('id', shadow.id)
    .append('feDropShadow')
    .attr('flood-opacity', 0.3)
    .attr('dx', 0)
    .attr('stdDeviation', 3);

  const node = svg
    .selectAll('g')
    .data(d3.group(root, (d) => d.height))
    .join('g')
    // .attr('filter', shadow)
    .selectAll('g')
    .data((d) => d[1])
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  node.append('title').text(
    (d) =>
      `${d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join('/')}\n${format(d.value)}`
  );

  node
    .append('rect')
    // .attr('id', (d) => (d.nodeUid = DOM.uid('node')).id)
    .attr('fill', (d) => color(d.height))
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0);

  node
    .append('clipPath')
    // .attr('id', (d) => (d.clipUid = DOM.uid('clip')).id)
    .append('use')
    .attr('xlink:href', (d) => d.nodeUid.href);

  node
    .append('text')
    .attr('clip-path', (d) => d.clipUid)
    .selectAll('tspan')
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
    .join('tspan')
    .attr('fill-opacity', (d, i, nodes) =>
      i === nodes.length - 1 ? 0.7 : null
    )
    .text((d) => d);

  node
    .filter((d) => d.children)
    .selectAll('tspan')
    .attr('dx', 3)
    .attr('y', 13);

  node
    .filter((d) => !d.children)
    .selectAll('tspan')
    .attr('x', 3)
    .attr(
      'y',
      (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
    );

  return svg.node();
}

class ProductTreemap extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.createTree = this.createTree.bind(this);
  }

  createTree() {
    let data =
      this.props.products && this.props.products.length > 0
        ? this.props.products
        : [{ id: 0, name: 'Loading', category: 'Loading', quantity: 1 }];
    const chartNode = Treemap(data, {
      path: (d) => d.name,
      value: (d) => d?.quantity,
      group: (d) => d.category,
      label: (d) => [d.name, d.quantity.toString()].join('\n'),
      width: 1000,
      height: 500,
    });

    // CLEAR ANY PREVIOUS CHARTS
    const app = document.getElementById('app');
    const prevCharts = document.querySelectorAll('svg');
    if (prevCharts) {
      for (let prevChart of prevCharts) {
        app.removeChild(prevChart);
      }
    }

    // INSERT STANDARD TREEMAP
    app.appendChild(chartNode);

    // INSERT CASCADED TREEMAP
    // data = cascadeData(data);
    // app.appendChild(chart(data));
  }

  componentDidMount() {
    this.props.setProducts();
    this.loading = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.loading = false; // Not sure what to put here.
    }
  }

  render() {
    this.createTree();
    return this.loading ? <h1>LOADING</h1> : <div>{/* <Tree /> */}</div>;
  }
}

ProductTreemap.propTypes = {
  products: PropTypes.array,
  setProducts: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: () => dispatch(setProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTreemap);
