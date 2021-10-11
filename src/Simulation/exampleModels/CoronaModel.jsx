import Model from "./Model";

class CoronaModel extends Model  {
  constructor() {
    super("CoronaModel",
      [["S", 0.965, "#1F85DE"], ["I1", 0.005, "#de1f50"], ["I2", 0.005, "#b91fde"], ["I3", 0.005, "#1fdea7"], ["R", 0.005, "#8fde1f"], ["V", 0.005, "#de801f"], ["D", 0.005, "#3b0b0b"]],
      [[["I1", "S"], ["I2", "E"], 0.15],
        [["I2", "S"], ["I2", "E"], 0.05],
        [["I3", "S"], ["I3", "E"], 0.05],
        ["E", "I1", 0.2],
        ["I1", "I2", 0.03],
        ["I2", "I3", 0.04],
        ["I3", "D", 0.25],
        ["I1", "R", 0.13],
        ["I2", "R", 0.13],
        ["I3", "R", 0.12]],
      1, 0.01);
  }
}

export default CoronaModel;
