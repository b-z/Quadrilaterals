/**
 * Created by Derek Xiao on 6/3/2017.
 */

function visualize_scanning(sorted_vertex) {
    //var x_values = sorted_vertex.map(function (v) {
    //    return v.x;
    //});
    //var canvas = document.getElementById('animation');
    //var animation_ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var progress = 0, step = 0.003, highlight_radius = 30;
    var node_color = "#3c3c3c";
    var scaling_radius = function (delta) {
        delta = Math.max(0, delta - 15);
        return highlight_radius * Math.exp(-delta / 10);
    };
    function frame() {
        var x_threshold = progress * width;
        var vertex = sorted_vertex.filter(function (v) {
            return v.x <= x_threshold + highlight_radius * 2;
        });

        animation_ctx.clearRect(0, 0, width, height);

        animation_ctx.beginPath();
        animation_ctx.fillStyle = "rgba(128,128,128,0.2)";
        animation_ctx.fillRect(-1, -1, x_threshold + 1, height + 2);

        animation_ctx.fillStyle = node_color;
        animation_ctx.fillRect(x_threshold - 1, -1, 4, height + 2);

        var size = 20;
        for (var i = 0; i < vertex.length; i ++) {
            var v = vertex[i];
            var delta = Math.abs(v.x - x_threshold);
            if (delta < highlight_radius * 5) {
                var r = scaling_radius(delta);
                animation_ctx.beginPath();
                animation_ctx.fillStyle = "orange";
                animation_ctx.fillRect(v.x - r, v.y - r,
                    r * 2, r * 2
                );
            }
            animation_ctx.fillStyle = node_color;
            animation_ctx.fillRect(v.x - size / 2, v.y - size / 2, size, size);

            // draw right neighbour relationship
            var rn = v.get_right_neighbour();
            if (rn == null) {
                continue;
            }
            animation_ctx.beginPath();
            animation_ctx.moveTo(v.x, v.y);
            animation_ctx.lineTo(rn.x, rn.y);
            animation_ctx.stroke();
        }
        if (progress <= 1) {
            requestAnimationFrame(frame);
        }
        progress += step;
    }

    var animation_id = requestAnimationFrame(frame);
    console.log(animation_id);
}