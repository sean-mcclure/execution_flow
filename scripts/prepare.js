az.style_body({
    "background": "rgb(34, 112, 147)",
    "font-family": "Dosis",
    "color": "white",
    "overflow" : "hidden"
})
az.add_sections({
    "this_class": "main_section",
    "sections": 2
})
az.style_body({
    "background": "rgb(34, 112, 147)",
    "font-family": "Dosis",
    "color": "white"
})
az.all_style_sections('main_section', {
    "background": "rgb(34, 112, 147)",
    "height": "auto",
    "border-radius": "6px",
    "overflow" : "hidden"
})
az.style_sections('main_section', 1, {
    "position": "fixed",
    "width": "100%",
    "flush": true,
    "background": "#141414"
})
az.style_sections('main_section', 2, {
    "position" : "absolute",
    "top" : "50%"
})
az.style_sections('main_section', 3, {
    "background": "#635e5e",
    "flush": true
})
az.add_layout('main_section', 1, {
    "this_class": "nav_clicks",
    "row_class": "nav_clicks_rows",
    "cell_class": "nav_clicks_cells",
    "number_of_rows": 1,
    "number_of_columns": 3
})
az.style_layout('nav_clicks', 1, {
    "height": "auto",
    "width": "100%",
    "align": "center",
    "border": "1px solid white"
})
az.add_text("nav_clicks_cells", 1, {
    "this_class": "notes_2_tree_title_main",
    "text": "Execution Flow"
})
az.style_text("notes_2_tree_title_main", 1, {
    "color": "white",
    "font-family": "Dosis",
    "font-size": "40px",
    "margin-top": "-10px",
    "margin-left": "10px",
    "cursor": "pointer",
    "align": "left",
    "white-space" : "nowrap"
})
az.style_word("notes_2_tree_title_main", 1, {
    "this_class": "highlight_word",
    "word": "Execution",
    "color": "yellow"
})
az.style_word("notes_2_tree_title_main", 1, {
    "this_class": "highlight_word2",
    "word": "Flow",
    "color": "rgb(255, 82, 82)"
})
az.add_icon("nav_clicks_cells", 3, {
    "this_class": "upload_icon",
    "icon_class": "fa-upload"
})
az.style_icon("upload_icon", 1, {
    "font-size": "40px",
    "cursor": "pointer",
    "align" : "right",
    "margin-right" : "10px"
})
az.add_event("upload_icon", 1, {
    "type": "click",
    "function": function() {
        az.click_element("upload_default", 1)
        // hide the default button but still use its functionality
    }
})
az.add_upload_button("main_section", 1, {
    "this_class": "upload_default"
})
az.style_upload_button("upload_default", 1, {
    "display": "none"
})
// accepts 'json', 'csv', 'png', 'jpg', and 'jpeg'
az.add_event("upload_default", 1, {
    "type": "upload",
    "function": function() {
        az.hold_value.root = data
        setTimeout(function() {
            az.post_message_to_frame('tree_visual', 1, {
                "function": function() {
                    main.redefine('data', parent.fetch_data())
                    main.redefine('chart_height', 45)
                }
            })
            az.add_text("nav_clicks_cells", 2, {
                "this_class": "title",
                "text": ""
            })
            az.style_text("title", 1, {
                "color": "white",
                "font-family": "Dosis",
                "font-size": "24px",
                "align": "center"
            })
            $(".title").text(fetch_title())
            az.style_iframe('tree_visual', 1, {
                "visibility": "visible"
            })
        }, 1000)
        az.close_overlay("upload_tree", 1)
    }
})
az.add_iframe('main_section', 2, {
    "this_class": "tree_visual",
    "source": "visuals/collapsible-tree/index.html",
    "scrolling": false
})
az.style_iframe('tree_visual', 1, {
    "width": "100%",
    "height": "800px",
    "align": "center",
    "overflow": "hidden",
    "visibility": "hidden"
})