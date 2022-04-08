import { standings, Stats } from "../types/leaderboard_stats";
import { Article } from "../types/articles";
import { sort_leader_board } from "../types/crud_leader_board";

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

let calculate_score = (leader_board_stats: Array<Stats>): Array<standings> => {
  let ref_array: Array<standings> = [];
  for (let i = 0; i < leader_board_stats.length; i++) {
    let instance: standings = {
      user: leader_board_stats[i].user,
      score:
        leader_board_stats[i].number_of_articles * 10 +
        20 * leader_board_stats[i].total_reactions,
    };
    ref_array.push(instance);
  }
  // console.log(sort_leader_board(ref_array));
  return ref_array;
};

export { updateLeaderBoard, calculate_score };
