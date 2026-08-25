import HeroSlide from "../models/HeroSlide.js";
import { makeCrud } from "./crudFactory.js";

export default makeCrud(HeroSlide, { publicFilter: { active: true } });
