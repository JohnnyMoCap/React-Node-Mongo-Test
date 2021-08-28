class TextConditions{

    constructor(){}

    //puts the string through all checks (assuming theyre all here and no one forgot to put them here -_-
    textChange = (inputText) => {
        inputText = this.appendEndIfWordIncluded(inputText,"sale","!");
        inputText = this.appendStartEndIfWordIncluded(inputText, "new","~~")
        inputText = this.allCAPSIfWordIncluded(inputText,"limited edition")
        return inputText;
    }

    //if the word is in the text it will add the append value at the end of it / NON CASE SENSATIVE
    appendEndIfWordIncluded = (inputText,word,append) => {
        let tempString = inputText
        tempString = tempString.toLowerCase()

        if(tempString.includes(word)){
            inputText = inputText+append;
        }
        return inputText;
    }

    //if the word is in the text it will add the append value at the start and end of it / NON CASE SENSATIVE
    appendStartEndIfWordIncluded = (inputText,word,append) => {
        let tempString = inputText
        tempString = tempString.toLowerCase()

        if(tempString.includes(word)){
            inputText = append+inputText+append;
        }
        return inputText;
    }

    //if the word is in the text it will make it ALL CAPS / NON CASE SENSATIVE
    allCAPSIfWordIncluded = (inputText,word) => {
        let tempString = inputText
        tempString = tempString.toLowerCase()
        if(tempString.includes(word)){
            //missed opportunity to have the method be in all caps but i digress
            inputText = inputText.toUpperCase()
        }
        return inputText;
    }

}

module.exports = TextConditions