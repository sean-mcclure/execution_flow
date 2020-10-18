az.add_overlay({
    "this_class": "loading_screen",
    "close_text_class": "x_out"
})
az.style_overlay('loading_screen', 1, {
    "width": "100%",
    "height": "100%",
    "background": "rgb(34, 112, 147)"
})
az.style_text('x_out', 1, {
    "display": "none"
})
az.add_layout("loading_screen", 1, {
    "this_class": "loading_section_layout",
    "row_class": "loading_section_layout_rows",
    "cell_class": "loading_section_layout_cells",
    "number_of_rows": 2,
    "number_of_columns": 1
})
az.style_layout("loading_section_layout", 1, {
    "height": "auto",
    "width": "90%",
    "align": "center",
    "margin-top": "-50px",
    "border": 0
})
az.add_text("loading_section_layout_cells", 1, {
    "this_class": "notes_2_tree_title",
    "text": "ExecutionFlow"
})
az.style_text("notes_2_tree_title", 1, {
    "color": "white",
    "font-family": "Dosis",
    "font-size": "40px",
    "align": "center"
})
az.style_word("notes_2_tree_title", 1, {
    "this_class": "highlight_word",
    "word": "Execution",
    "color": "yellow"
})
az.style_word("notes_2_tree_title", 1, {
    "this_class": "highlight_word2",
    "word": "Flow",
    "color": "rgb(255, 82, 82)"
})
if (az.check_for_mobile()) {
    az.style_text("notes_2_tree_title", 1, {
        "font-size": "90px"
    })
}
az.align_element('loading_section_layout', 1, 'center_screen')
az.call_once_satisfied({
    "condition": "1 === 1",
    "function": function() {
        setTimeout(function() {
            az.click_element('x_out', 1)
        }, 2000)
    }
})
az.add_html('loading_section_layout_cells', 2, {
    "html": "<div class='main_prog_bar' id='myProgress'><div id='myBar'>10%</div></div>"
})
az.style_html('main_prog_bar', 1, {
    "align": "center",
    "font-family": "Blinker"
})
$('#myProgress').css('width', '100%').css('background-color', 'transparent').css('border-radius', '30px').css('position', 'absolute')
$('#myBar').css('width', '10%').css('height', '30px').css('background-color', 'white').css('text-align', 'center').css('line-height', '30px').css('color', 'white').css('font-weight', 'bold').css('margin-top', '20px')
az.animate_element('overlay_txt', 1, {
    "type": "fadeIn"
})
$('#' + 'myBar').css('display', 'none').css('border-radius', '30px')
az.delay_event({
    "delay": 0,
    "function": "progress_bar()"
})

function progress_bar() {
    var elem = document.getElementById("myBar");
    setTimeout(function() {
        $(elem).css("display", "block")
    }, 100)
    var width = 10;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width / 2 + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}
