import * as result from "./result";
import * as saveQuery from "./saveQuery";
import * as saveProduct from "./saveProduct";
import * as getQuery from "./getQuery";

export default {
    ...result,
    ...saveQuery,
    ...saveProduct,
    ...getQuery,
};
