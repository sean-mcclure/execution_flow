function fetch_data() {
    return(az.hold_value.root)
}

function fetch_title() {
    return(az.hold_value.root.name)
}

function adjust_frame_height(height) {
    var use_height = height + 40
    az.style_iframe('tree_visual', 1, {
        "height": use_height + "px"
    })
}