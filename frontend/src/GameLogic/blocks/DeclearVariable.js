import Block from "./Block";

export default class DeclearVariable extends Block{
    constructor(block){
        super(block);
        this.name = this.values.name;
    }

    validate(program){
        //check if this variable is declared already, if so: add error;
        if (program.checkContext('declare_variable', this.name)){
            program.addError(this.id, `Variable "${this.name}" has already been declared. Don't declare it again!`);  
            return false;      
        }
        
        program.addContext('declare_variable', this.name);

        return true;
    }

}