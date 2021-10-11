import Model from "./Model";

class SIModel extends Model  {
  constructor() {
    super("SIModel",
      [["S", 0.97, "#1F85DE"], ["I", 0.03, "#de1f50"]],
      [["S", "I", 0.5]],
      20, 0.05);
  }
}

export default SIModel;
