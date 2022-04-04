import axios, { AxiosResponse } from "axios";

const Iterator = (data: any) => {
  for (let i = 0; i < data.length; i++) {}
};

const organization_articles_user_wise = (user: String) => {
  const base_url: string = "https://dev.to";
};

const All_articles_organization = (org_name: String) => {
  const base_url: string = "https://dev.to";
  const config = { "api-key": "W3jWaXoKW6xrDPYPriuo2JqR" };
  axios
    .get(`${base_url}/api/organizations/${org_name}/articles`, {
      headers: config,
    })
    .then((res: AxiosResponse) => {
      let data:Object = res.data;
      let leader_board = {};
      for (let i = 0; i < 2; i++) {
        if (leader_board[data[i]["user"]["name"]] != "undefined")
      }

    });
};

All_articles_organization("kcdchennai");
