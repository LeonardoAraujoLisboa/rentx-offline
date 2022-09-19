import { appSchema } from "@nozbe/watermelondb";
import { carSchema } from "./carSchema";
import { userSchema } from "./userSchema";

const schemas = appSchema({
    version: 2,//quando vc colocar mais uma tabela vc altera a versao do banco q ele ja sobe essa alteração
    tables: [
        userSchema,
        carSchema
    ]
})

export {schemas}