import { standings, Stats } from "../types/leaderboard_stats";
import { Article } from "../types/articles";

let updateLeaderBoard = (
  leader_board_Stats: Array<Stats>,
  article: Article
): void => {
  for (let i = 0; i < leader_board_Stats.length; i++) {
    if (leader_board_Stats[i].user.username == article.user.username) {
      leader_board_Stats[i].total_reactions += article.public_reactions_count;
      leader_board_Stats[i].number_of_articles += 1;
    }
  }
};

let sort_leader_board = (
  leader_board_stats: Array<standings>
): Array<standings> => {
  for (let i = 0; i < leader_board_stats.length; i++) {
    for (let j = 0; j < leader_board_stats.length - i - 1; j++) {
      if (leader_board_stats[j].score > leader_board_stats[j + 1].score) {
        leader_board_stats[j],
          (leader_board_stats[j + 1] = leader_board_stats[j]),
          leader_board_stats[j + 1];
      }
    }
  }
  return leader_board_stats;
};

let calculate_score = (leader_board_stats: Array<Stats>): Array<standings> => {
  let ref_array: Array<standings> = [];
  for (let i = 0; i < leader_board_stats.length; i++) {
    let instance: standings = {
      user: leader_board_stats[i].user,
      score:
        leader_board_stats[i].number_of_articles * 15 +
        leader_board_stats[i].total_reactions * 20,
    };
    ref_array.push(instance);
  }
  return ref_array;
};

export { updateLeaderBoard, calculate_score, sort_leader_board };
