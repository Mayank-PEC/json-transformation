import Transform from '../models/json_transformer.js'

const file_names = async (req, res) => {

    const names = [];
    const files = await Transform.find({});
    // const files = [{name:'acd'}, {name:'acd'}];
    if (Array.isArray(files) && files.length) {

        var i;
        for (i = 0; i < files.length; i++) {
            names.push(files[i].name);
        }
    }

    res.status(200).json({
        names
    });

}

export default file_names;
