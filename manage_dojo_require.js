var jQ = jQuery;

jQ(init);

function init() {
    jQ('button').click(do_merge);
}

function do_merge() {
    var txt = jQ('textarea').val().replace(')', ',');
    var input = [];
    var parts = txt.split(',')
    var mode = 'list';
    var requirements = [];
    var all_requirements = {};
    var outputs = [];
    for (var i in parts) {
        var part = parts[i].replace(/\s/g, '');
        if (part.indexOf('[') != -1) {
            if (requirements.length) {
                input[input.length] = {};
                for (var i in outputs) {
                    input[input.length-1][requirements[i]] = outputs[i];
                }
            }
            mode = 'list';
            requirements = [];
            outputs = [];
        }
        if (part.indexOf('function(') != -1) {
            mode = 'outputs';
            part = part.replace('function(', '');
        }
        if (mode == 'list') {
            var key = part.replace(/[[\]"']/g, '');
            requirements[requirements.length] = key;
            all_requirements[key] = 1;
        } else {
            var value = part.replace(/[()"']/g, '');
            outputs[outputs.length] = value;
        }
    }
    if (requirements.length) {
        input[input.length] = {};
        for (var i in outputs) {
            if (outputs[i]) {
                input[input.length-1][requirements[i]] = outputs[i];
            }
        }
    }
    var out_requirements = [];
    var done_requirements = {};
    var out_outputs = [];
    for (var i in input) {
        obj = input[i];
        for (var o in obj) {
            if (!done_requirements[o]) {
                done_requirements[o] = 1;
                out_requirements[out_requirements.length] = o;
                out_outputs[out_outputs.length] = obj[o];
            }
        }
    }
    for (var i in all_requirements) {
        if (!done_requirements[i]) {
            out_requirements[out_requirements.length] = i;
            done_requirements[i] = 1;
        }
    }
    
    jQ('#output').text("require([\n    '"+out_requirements.join("',\n    '") + 
                       "'\n], function(\n    "+out_outputs.join(',\n    ')+"\n){\n})")
}
