import stylish from "./stylish.js";
import plain from "./plain.js";

const whichFormat = (objOfDiff, format) => {
    if (format === 'stylish') {
        return stylish(objOfDiff);
    } 
    
    return plain(objOfDiff);
};

export default whichFormat;