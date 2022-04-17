import axios, { AxiosResponse } from "axios";
import { Article } from "./types/articles";
import { Config } from "./types/config";
import { Stats } from "./types/leaderboard_stats";
import check from "./src/checker";
import { calculate_score, updateLeaderBoard } from "./src/crud_leader_board";

const All_articles_organization = (org_name: String) => {
  const base_url: string = "https://dev.to";
  const config: Config 
  axios
    .get(`${base_url}/api/organizations/${org_name}/articles`, {
      headers: { api_key: config.api_key },
    })
    .then((res: AxiosResponse) => {
      let data: Array<Article> = res.data; /// This will contain all the articles posted to the kcd-chennai Organization
      let data_board: Array<Stats> = [];
      let ref_list: Array<String> = [];
      for (let i = 0; i < data.length; i++) {
        if (
          check(ref_list, data[i].user.username) == false &&
          new Date(data[i].published_at) >= new Date("2022-04-16T00:00:00.000Z")
        ) {
          ref_list.push(data[i].user.username);

          let stat_instance: Stats = {
            user: {
              name: data[i].user.name,
              username: data[i].user.username,
              github_username: data[i].user.github_username,
              profile_image: data[i].user.profile_image,
            },
            total_reactions: data[i].public_reactions_count,
            number_of_articles: 1,
          };
          data_board.push(stat_instance);
        } else {
          updateLeaderBoard(data_board, data[i]);
          continue;
        }
      }
      console.log(
        calculate_score(data_board).sort((a, b) => (a.score < b.score ? -1 : 1))
      );
    });
};

All_articles_organization("kcdchennai"); /// Add your organization names
