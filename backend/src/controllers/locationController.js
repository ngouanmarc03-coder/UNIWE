import Location from "../models/Location.js";
import { makeCrud } from "./crudFactory.js";

export default makeCrud(Location, { publicFilter: { active: true } });
