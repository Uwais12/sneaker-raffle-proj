import React from 'react';

import { select, line, curveCardinalClosed, ease } from 'd3';
import { easeLinear } from 'd3-ease';

class Blob extends React.Component {
    componentDidMount() {
        this.drawBlob();
    }

    drawBlob = () => {
        const node = this.node;
        const blob = select(node)
            .append("path")
            .datum(this.range(10))
            .attr("fill", "#FFABAB")
            .attr("d", line().curve(curveCardinalClosed));

        select(node)
            .transition()
            .duration(3000)
            .on("start", function repeat() {
                blob
                    .transition()
                    .ease(easeLinear)  // Updated to use easeLinear from d3-ease
                    .attr("d", line().curve(curveCardinalClosed))
                    .transition()
                    .ease(easeLinear)  // Updated to use easeLinear from d3-ease
                    .attr("d", line().curve(curveCardinalClosed))
                    .transition()
                    .on("start", repeat);
            });
    };



    range = k => {
        return Array.from({ length: k }, (_, i) => [
            Math.cos((i / k) * 2 * Math.PI),
            Math.sin((i / k) * 2 * Math.PI)
        ]);
    };

    render() {
        return <svg ref={node => (this.node = node)} width={500} height={500} />;
    }
}

export default Blob;
