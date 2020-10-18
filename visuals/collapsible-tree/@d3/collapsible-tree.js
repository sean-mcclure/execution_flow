// https://observablehq.com/@d3/collapsible-tree@347
export default function define(runtime, observer) {
    const main = runtime.module();
    main.variable(observer()).define(["md"], function(md) {
        return (md)
    });
    main.variable(observer("chart")).define("chart", ["d3", "data", "dy", "margin", "width", "height", "dx", "tree", "diagonal"], function(d3, data, dy, margin, width, dx, height, tree, diagonal) {
        const root = d3.hierarchy(data);
        root.x0 = dy / 2;
        root.y0 = 0;
        root.descendants().forEach((d, i) => {
            d.id = i;
            d._children = d.children;
            if (d.depth && d.data.name.length !== 0) d.children = null;
        });
        const svg = d3.create("svg").attr("viewBox", [-margin.left, -margin.top, width, dx]).style("font-family", "arial").style("font-size", "20px").style("fill", "#141414").style("user-select", "none");
        const gLink = svg.append("g").attr("fill", "none").attr("stroke-opacity", 0.8).attr("stroke", "hotpink").attr("stroke-width", 1.5);
        const gNode = svg.append("g").attr("cursor", "pointer").attr("pointer-events", "all");

        svg.call(d3.zoom().extent([
            [0, 0],
            [width, height]
        ]).scaleExtent([1, 1]).on("zoom", zoomed));

        function zoomed() {
            gNode.attr("transform", d3.event.transform);
            gLink.attr("transform", d3.event.transform);
        }


        function expand(d) {
            var children = (d.children) ? d.children : d._children;
            if (d._children) {
                d.children = d._children;
                d._children = null;
            }
            if (children) children.forEach(expand);
        }

        function expandAll() {
            expand(root);
            update(root);
        }

        function collapseAll() {
            root.children.forEach(collapse);
            collapse(root);
            update(root);
        }
        var cnt = 0

        function update(source) {
            cnt++
            if (cnt == 1) {
                expandAll()
            }
            const duration = d3.event && d3.event.altKey ? 2500 : 450;
            const nodes = root.descendants().reverse();
            const links = root.links();
            tree(root);
            let left = root;
            let right = root;
            root.eachBefore(node => {
                if (node.x < left.x) left = node;
                if (node.x > right.x) right = node;
            });
            const height = right.x - left.x + margin.top + margin.bottom;
            const transition = svg.transition().duration(duration).attr("viewBox", [-margin.left, left.x - margin.top, width, height]).tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));
            if(typeof(parent.adjust_frame_height) === 'function') {
            parent.adjust_frame_height(height)
            }
            const node = gNode.selectAll("g").data(nodes, d => d.id);
            const nodeEnter = node.enter().append("g").attr("transform", d => `translate(${source.y0},${source.x0})`).attr("fill-opacity", 0)
            .attr("cursor", function(d) {

                if(typeof(d.data.papers) !== 'undefined' || typeof(d.data.images) !== 'undefined' || typeof(d.data.notes) !== 'undefined' || typeof(d.data.videos) !== 'undefined'|| typeof(d.data.webpages) !== 'undefined') {
                if (d.data.papers.length > 0 || d.data.images.length > 0 || d.data.notes.length > 0 || d.data.videos.length > 0 || d.data.webpages.length > 0) {
                    return("pointer")
                } else {
                    return("auto")
                }
                }
            })
            .attr("stroke-opacity", 0).on("click", d => {
                if (d.data.papers.length > 0 || d.data.images.length > 0 || d.data.notes.length > 0 || d.data.videos.length > 0 || d.data.webpages.length > 0) {
                    parent.pop_modal(d.data.name, 'published');
                }
                //parent.scroll_to_textarea_line('notes_textarea', 1, d.data.name)
            })
            nodeEnter.append("circle").attr("r", 7).attr("class", 'node_circle').attr("fill", d => d._children ? "white" : "#ff5252").attr("stroke-width", 0.7).attr('stroke', 'white');
            nodeEnter.append("text").style('fill', function(d) {
                if (typeof(d.data.papers) !== 'undefined') {
                    if (d.data.papers.length > 0 || d.data.images.length > 0 || d.data.notes.length > 0 || d.data.videos.length > 0 || d.data.webpages.length > 0) {
                        return ('yellow')
                    } else {
                        return ('white')
                    }
                } else {
                    return ('white')
                }
            }).attr("dy", "0.31em").attr("x", d => d._children ? -10 : 10).attr("text-anchor", d => d._children ? "end" : "start").text(d => d.data.name).clone(true).lower().attr("stroke-linejoin", "round").attr("stroke-width", 3).style("margin-left", "10px").style("margin-right", "10px");
            const nodeUpdate = node.merge(nodeEnter).transition(transition).attr("transform", d => `translate(${d.y},${d.x})`).attr("fill-opacity", 1).attr("stroke-opacity", 1);
            const nodeExit = node.exit().transition(transition).remove().attr("transform", d => `translate(${source.y},${source.x})`).attr("fill-opacity", 0).attr("stroke-opacity", 0);
            const link = gLink.selectAll("path").data(links, d => d.target.id);
            const linkEnter = link.enter().append("path").attr("d", d => {
                const o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });
            link.merge(linkEnter).transition(transition).attr("d", diagonal);
            link.exit().transition(transition).remove().attr("d", d => {
                const o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });
            root.eachBefore(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
        update(root);
        return svg.node();
    });
    main.variable(observer("height")).define("height", function() {
        return (600)
    });
    main.variable(observer("diagonal")).define("diagonal", ["d3"], function(d3) {
        return (d3.linkHorizontal().x(d => d.y).y(d => d.x))
    });
    main.variable(observer("tree")).define("tree", ["d3", "dx", "dy", "chart_height"], function(d3, dx, dy, chart_height) {
        return (d3.tree().nodeSize([dx + chart_height, dy + chart_height]))
    });
    main.variable(observer("data")).define("data", ["d3"], function(d3) {
        return (d3.json("https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json"))
    });
    main.variable(observer("dx")).define("dx", function() {
        return (10)
    });
    main.variable(observer("dy")).define("dy", ["width"], function(width) {
        return (width / 6)
    });
    main.variable(observer("margin")).define("margin", function() {
        return ({
            top: 10,
            right: 10,
            bottom: 10,
            left: 150
        })
    });
    main.variable(observer("d3")).define("d3", ["require"], function(require) {
        return (require("d3@5"))
    });
    return main;
}