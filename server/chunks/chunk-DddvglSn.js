import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { Container, Box, Typography, TextField } from "@mui/material";
import { g as getCharacterPortraits, a as getArtistPortraits, P as ProfileItem } from "./chunk-Bgyqguoc.js";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CollectionsIcon from "@mui/icons-material/Collections";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
/*! src/components/ArtworkCountSortButton/ArtworkCountSortButton.constants.ts [vike:pluginModuleBanner] */
const ariaSortMap = {
  none: "none",
  asc: "ascending",
  desc: "descending"
};
const iconMap = {
  asc: ArrowUpwardIcon,
  desc: ArrowDownwardIcon,
  none: CollectionsIcon
};
/*! src/components/ArtworkCountSortButton/ArtworkCountSortButton.tsx [vike:pluginModuleBanner] */
const getAriaSort = (order) => ariaSortMap[order];
const ArtworkCountSortIconButton = ({ sortOrder, onToggleSortOrder }) => {
  const IconComponent = iconMap[sortOrder] ?? iconMap.none;
  return /* @__PURE__ */ jsx(Tooltip, { title: "Sort by Artwork Count", arrow: true, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      "aria-label": "Sort by Artwork Count",
      "aria-pressed": sortOrder !== "none",
      "aria-sort": getAriaSort(sortOrder),
      onClick: onToggleSortOrder,
      color: sortOrder === "none" ? "default" : "primary",
      size: "medium",
      children: /* @__PURE__ */ jsx(IconComponent, {})
    }
  ) });
};
/*! src/components/ListPage/ListPage.styles.ts [vike:pluginModuleBanner] */
const styles = {
  container: {
    py: 4
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    mb: 5,
    px: 2
  },
  typography: {
    flexBasis: "100%",
    textAlign: "center",
    color: "text.primary",
    fontWeight: 600,
    mb: 2,
    letterSpacing: "0.05em"
  },
  textField: {
    maxWidth: 300,
    flexGrow: 1,
    minWidth: 220
  },
  listGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    listStyle: "none",
    padding: 0,
    margin: 0,
    "@media (max-width:1024px)": {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
    "@media (max-width:768px)": {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    "@media (max-width:480px)": {
      gridTemplateColumns: "1fr"
    }
  }
};
/*! data/processed-data.ts [vike:pluginModuleBanner] */
const characters = [
  {
    "id": "reimu",
    "name": "Hakurei Reimu",
    "work": [
      "eosd"
    ],
    "artworkCount": 63
  },
  {
    "id": "marisa",
    "name": "Kirisame Marisa",
    "work": [
      "eosd"
    ],
    "artworkCount": 43
  },
  {
    "id": "rin",
    "name": "Satsuki Rin",
    "work": [
      "eosd"
    ],
    "artworkCount": 0
  },
  {
    "id": "rumia",
    "name": "Rumia",
    "work": [
      "eosd"
    ],
    "artworkCount": 10
  },
  {
    "id": "daiyousei",
    "name": "Daiyōsei",
    "work": [
      "eosd"
    ],
    "artworkCount": 3
  },
  {
    "id": "cirno",
    "name": "Cirno",
    "work": [
      "eosd"
    ],
    "artworkCount": 10
  },
  {
    "id": "meiling",
    "name": "Hong Meiling",
    "work": [
      "eosd"
    ],
    "artworkCount": 11
  },
  {
    "id": "koakuma",
    "name": "Koakuma",
    "work": [
      "eosd"
    ],
    "artworkCount": 5
  },
  {
    "id": "patchouli",
    "name": "Patchouli Knowledge",
    "work": [
      "eosd"
    ],
    "artworkCount": 15
  },
  {
    "id": "sakuya",
    "name": "Izayoi Sakuya",
    "work": [
      "eosd"
    ],
    "artworkCount": 30
  },
  {
    "id": "remilia",
    "name": "Remilia Scarlet",
    "work": [
      "eosd"
    ],
    "artworkCount": 38
  },
  {
    "id": "flandre",
    "name": "Flandre Scarlet",
    "work": [
      "eosd"
    ],
    "artworkCount": 35
  },
  {
    "id": "letty",
    "name": "Letty Whiterock",
    "work": [
      "pcb"
    ],
    "artworkCount": 1
  },
  {
    "id": "chen",
    "name": "Chen",
    "work": [
      "pcb"
    ],
    "artworkCount": 15
  },
  {
    "id": "alice",
    "name": "Alice Margatroid",
    "work": [
      "pcb"
    ],
    "artworkCount": 13
  },
  {
    "id": "lily",
    "name": "Lily White",
    "work": [
      "pcb"
    ],
    "artworkCount": 1
  },
  {
    "id": "lunasa",
    "name": "Lunasa Prismriver",
    "work": [
      "pcb"
    ],
    "artworkCount": 1
  },
  {
    "id": "merlin",
    "name": "Merlin Prismriver",
    "work": [
      "pcb"
    ],
    "artworkCount": 1
  },
  {
    "id": "lyrica",
    "name": "Lyrica Prismriver",
    "work": [
      "pcb"
    ],
    "artworkCount": 1
  },
  {
    "id": "youmu",
    "name": "Konpaku Yōmu",
    "work": [
      "pcb"
    ],
    "artworkCount": 11
  },
  {
    "id": "yuyuko",
    "name": "Saigyōji Yuyuko",
    "work": [
      "pcb"
    ],
    "artworkCount": 4
  },
  {
    "id": "ran",
    "name": "Yakumo Ran",
    "work": [
      "pcb",
      "udoalg"
    ],
    "artworkCount": 16
  },
  {
    "id": "yukari",
    "name": "Yakumo Yukari",
    "work": [
      "pcb",
      "iamp",
      "in",
      "swr",
      "sa",
      "soku",
      "aocf"
    ],
    "artworkCount": 25
  },
  {
    "id": "renko",
    "name": "Usami Renko",
    "work": [
      "hifuu"
    ],
    "artworkCount": 3
  },
  {
    "id": "merry",
    "name": "Maëlivérie Hearn",
    "work": [
      "hifuu"
    ],
    "artworkCount": 5
  },
  {
    "id": "rinnosuke",
    "name": "Morichika Rinnosuke",
    "work": [
      "cola"
    ],
    "artworkCount": 1
  },
  {
    "id": "tokiko",
    "name": "Tokiko",
    "work": [
      "cola"
    ],
    "artworkCount": 0
  },
  {
    "id": "suika",
    "name": "Ibuki Suika",
    "work": [
      "iamp",
      "swr",
      "sa",
      "soku",
      "udoalg"
    ],
    "artworkCount": 8
  },
  {
    "id": "wriggle",
    "name": "Wriggle Nightbug",
    "work": [
      "in"
    ],
    "artworkCount": 6
  },
  {
    "id": "mystia",
    "name": "Mystia Lorelei",
    "work": [
      "in"
    ],
    "artworkCount": 5
  },
  {
    "id": "keine",
    "name": "Kamishirasawa Keine",
    "work": [
      "in"
    ],
    "artworkCount": 4
  },
  {
    "id": "tewi",
    "name": "Inaba Tewi",
    "work": [
      "in"
    ],
    "artworkCount": 11
  },
  {
    "id": "reisen",
    "name": "Reisen Udondein Inaba",
    "work": [
      "in"
    ],
    "artworkCount": 29
  },
  {
    "id": "eirin",
    "name": "Yagokoro Eirin",
    "work": [
      "in"
    ],
    "artworkCount": 8
  },
  {
    "id": "kaguya",
    "name": "Hōraisan Kaguya",
    "work": [
      "in"
    ],
    "artworkCount": 14
  },
  {
    "id": "mokou",
    "name": "Fujiwara no Mokō",
    "work": [
      "in"
    ],
    "artworkCount": 18
  },
  {
    "id": "sunny",
    "name": "Sunny Milk",
    "work": [
      "sgs"
    ],
    "artworkCount": 2
  },
  {
    "id": "luna",
    "name": "Luna Child",
    "work": [
      "sgs"
    ],
    "artworkCount": 1
  },
  {
    "id": "star",
    "name": "Star Sapphire",
    "work": [
      "sgs"
    ],
    "artworkCount": 1
  },
  {
    "id": "aya",
    "name": "Shameimaru Aya",
    "work": [
      "pofv",
      "sa",
      "mof",
      "ds"
    ],
    "artworkCount": 25
  },
  {
    "id": "medicine",
    "name": "Medicine Melancholy",
    "work": [
      "pofv"
    ],
    "artworkCount": 5
  },
  {
    "id": "yuuka",
    "name": "Kazami Yūka",
    "work": [
      "pofv"
    ],
    "artworkCount": 5
  },
  {
    "id": "komachi",
    "name": "Onozuka Komachi",
    "work": [
      "pofv"
    ],
    "artworkCount": 5
  },
  {
    "id": "eiki",
    "name": "Shiki Eiki, Yamaxanadu",
    "work": [
      "pofv"
    ],
    "artworkCount": 6
  },
  {
    "id": "reisen2",
    "name": "Reisen",
    "work": [
      "ssib"
    ],
    "artworkCount": 0
  },
  {
    "id": "toyohime",
    "name": "Watasuki no Toyohime",
    "work": [
      "ssib"
    ],
    "artworkCount": 2
  },
  {
    "id": "yorihime",
    "name": "Watatsuki no Yorihime",
    "work": [
      "ssib"
    ],
    "artworkCount": 3
  },
  {
    "id": "akyuu",
    "name": "Hieda no Akyū",
    "work": [
      "pmiss"
    ],
    "artworkCount": 1
  },
  {
    "id": "shizuha",
    "name": "Aki Shizuha",
    "work": [
      "mof"
    ],
    "artworkCount": 5
  },
  {
    "id": "minoriko",
    "name": "Aki Minoriko",
    "work": [
      "mof"
    ],
    "artworkCount": 5
  },
  {
    "id": "hina",
    "name": "Kagiyama Hina",
    "work": [
      "mof"
    ],
    "artworkCount": 0
  },
  {
    "id": "nitori",
    "name": "Kawashiro Nitori",
    "work": [
      "mof"
    ],
    "artworkCount": 5
  },
  {
    "id": "momiji",
    "name": "Inubashiri Momiji",
    "work": [
      "mof"
    ],
    "artworkCount": 7
  },
  {
    "id": "sanae",
    "name": "Kochiya Sanae",
    "work": [
      "mof",
      "sa",
      "ufo",
      "soku",
      "td",
      "lolk",
      "um",
      "udoalg"
    ],
    "artworkCount": 21
  },
  {
    "id": "kanako",
    "name": "Yasaka Kanako",
    "work": [
      "mof"
    ],
    "artworkCount": 1
  },
  {
    "id": "suwako",
    "name": "Moriya Suwako",
    "work": [
      "mof"
    ],
    "artworkCount": 4
  },
  {
    "id": "iku",
    "name": "Nagae Iku",
    "work": [
      "swr"
    ],
    "artworkCount": 0
  },
  {
    "id": "tenshi",
    "name": "Hinanawi Tenshi",
    "work": [
      "swr"
    ],
    "artworkCount": 1
  },
  {
    "id": "kisume",
    "name": "Kisume",
    "work": [
      "sa"
    ],
    "artworkCount": 1
  },
  {
    "id": "yamame",
    "name": "Kurodani Yamame",
    "work": [
      "sa"
    ],
    "artworkCount": 5
  },
  {
    "id": "parsee",
    "name": "Mizuhashi Parsee",
    "work": [
      "sa"
    ],
    "artworkCount": 1
  },
  {
    "id": "yuugi",
    "name": "Hoshiguma Yūgi",
    "work": [
      "sa"
    ],
    "artworkCount": 6
  },
  {
    "id": "satori",
    "name": "Komeiji Satori",
    "work": [
      "sa"
    ],
    "artworkCount": 12
  },
  {
    "id": "orin",
    "name": "Kaenbyō Rin",
    "work": [
      "sa",
      "udoalg"
    ],
    "artworkCount": 11
  },
  {
    "id": "okuu",
    "name": "Reiuji Utsuho",
    "work": [
      "sa"
    ],
    "artworkCount": 5
  },
  {
    "id": "koishi",
    "name": "Komeiji Koishi",
    "work": [
      "sa"
    ],
    "artworkCount": 21
  },
  {
    "id": "nazrin",
    "name": "Nazrin",
    "work": [
      "ufo"
    ],
    "artworkCount": 7
  },
  {
    "id": "kogasa",
    "name": "Tatara Kogasa",
    "work": [
      "ufo"
    ],
    "artworkCount": 4
  },
  {
    "id": "ichirin",
    "name": "Kumoi Ichirin",
    "work": [
      "ufo"
    ],
    "artworkCount": 2
  },
  {
    "id": "minamitsu",
    "name": "Murasa Minamitsu",
    "work": [
      "ufo"
    ],
    "artworkCount": 2
  },
  {
    "id": "shou",
    "name": "Toramaru Shō",
    "work": [
      "ufo"
    ],
    "artworkCount": 4
  },
  {
    "id": "byakuren",
    "name": "Hijiri Byakuren",
    "work": [
      "ufo"
    ],
    "artworkCount": 10
  },
  {
    "id": "nue",
    "name": "Hōjū Nue",
    "work": [
      "ufo"
    ],
    "artworkCount": 9
  },
  {
    "id": "hatate",
    "name": "Himekaidō Hatate",
    "work": [
      "ds"
    ],
    "artworkCount": 1
  },
  {
    "id": "kasen",
    "name": "Ibaraki Kasen",
    "work": [
      "aocf"
    ],
    "artworkCount": 4
  },
  {
    "id": "kyouko",
    "name": "Kasodani Kyōko",
    "work": [
      "td"
    ],
    "artworkCount": 3
  },
  {
    "id": "yoshika",
    "name": "Miyako Yoshika",
    "work": [
      "td"
    ],
    "artworkCount": 7
  },
  {
    "id": "seiga",
    "name": "Kaku Seiga",
    "work": [
      "td"
    ],
    "artworkCount": 9
  },
  {
    "id": "tojiko",
    "name": "Soga no Tojiko",
    "work": [
      "td"
    ],
    "artworkCount": 9
  },
  {
    "id": "futo",
    "name": "Mononobe no Futo",
    "work": [
      "td"
    ],
    "artworkCount": 7
  },
  {
    "id": "miko",
    "name": "Toyosatomimi no Miko",
    "work": [
      "td"
    ],
    "artworkCount": 14
  },
  {
    "id": "mamizou",
    "name": "Futatsuiwa Mamizō",
    "work": [
      "td"
    ],
    "artworkCount": 1
  },
  {
    "id": "kosuzu",
    "name": "Motōri Kosuzu",
    "work": [
      "td"
    ],
    "artworkCount": 4
  },
  {
    "id": "kokoro",
    "name": "Hata no Kokoro",
    "work": [
      "td"
    ],
    "artworkCount": 5
  },
  {
    "id": "wakasagihime",
    "name": "Wakasagihime",
    "work": [
      "ddc"
    ],
    "artworkCount": 1
  },
  {
    "id": "sekibanki",
    "name": "Sekibanki",
    "work": [
      "ddc"
    ],
    "artworkCount": 2
  },
  {
    "id": "kagerou",
    "name": "Imaizumi Kagerō",
    "work": [
      "ddc"
    ],
    "artworkCount": 7
  },
  {
    "id": "benben",
    "name": "Tsukumo Benben",
    "work": [
      "ddc"
    ],
    "artworkCount": 0
  },
  {
    "id": "yatsuhashi",
    "name": "Tsukumo Yatsuhashi",
    "work": [
      "ddc"
    ],
    "artworkCount": 0
  },
  {
    "id": "seija",
    "name": "Kijin Seija",
    "work": [
      "ddc"
    ],
    "artworkCount": 8
  },
  {
    "id": "shinmyoumaru",
    "name": "Sukuna Shinmyōmaru",
    "work": [
      "ddc"
    ],
    "artworkCount": 2
  },
  {
    "id": "raiko",
    "name": "Horikawa Raiko",
    "work": [
      "ddc"
    ],
    "artworkCount": 2
  },
  {
    "id": "sumireko",
    "name": "Usami Sumireko",
    "work": [
      "ulil"
    ],
    "artworkCount": 0
  },
  {
    "id": "seiran",
    "name": "Seiran",
    "work": [
      "lolk"
    ],
    "artworkCount": 1
  },
  {
    "id": "ringo",
    "name": "Ringo",
    "work": [
      "lolk"
    ],
    "artworkCount": 0
  },
  {
    "id": "doremy",
    "name": "Doremy Sweet",
    "work": [
      "lolk"
    ],
    "artworkCount": 5
  },
  {
    "id": "sagume",
    "name": "Kishin Sagume",
    "work": [
      "lolk"
    ],
    "artworkCount": 4
  },
  {
    "id": "clownpiece",
    "name": "Clownpiece",
    "work": [
      "lolk"
    ],
    "artworkCount": 1
  },
  {
    "id": "junko",
    "name": "Junko",
    "work": [
      "lolk"
    ],
    "artworkCount": 9
  },
  {
    "id": "hecatia",
    "name": "Hecatia Lapislazuli",
    "work": [
      "lolk"
    ],
    "artworkCount": 5
  },
  {
    "id": "joon",
    "name": "Yorigami Jo'on",
    "work": [
      "aocf"
    ],
    "artworkCount": 7
  },
  {
    "id": "shion",
    "name": "Yorigami Shion",
    "work": [
      "aocf"
    ],
    "artworkCount": 5
  },
  {
    "id": "larva",
    "name": "Eternity Larva",
    "work": [
      "hsifs"
    ],
    "artworkCount": 4
  },
  {
    "id": "nemuno",
    "name": "Sakata Nemuno",
    "work": [
      "hsifs"
    ],
    "artworkCount": 0
  },
  {
    "id": "aun",
    "name": "Komano Aun",
    "work": [
      "hsifs"
    ],
    "artworkCount": 4
  },
  {
    "id": "narumi",
    "name": "Yatadera Narumi",
    "work": [
      "hsifs"
    ],
    "artworkCount": 1
  },
  {
    "id": "mai",
    "name": "Teireida Mai",
    "work": [
      "hsifs"
    ],
    "artworkCount": 4
  },
  {
    "id": "satono",
    "name": "Nishida Satono",
    "work": [
      "hsifs"
    ],
    "artworkCount": 5
  },
  {
    "id": "okina",
    "name": "Matara Okina",
    "work": [
      "hsifs"
    ],
    "artworkCount": 16
  },
  {
    "id": "eika",
    "name": "Ebisu Eika",
    "work": [
      "wbawc"
    ],
    "artworkCount": 1
  },
  {
    "id": "kutaka",
    "name": "Niwatari Kutaka",
    "work": [
      "wbawc"
    ],
    "artworkCount": 3
  },
  {
    "id": "urumi",
    "name": "Ushizaki Urumi",
    "work": [
      "wbawc"
    ],
    "artworkCount": 1
  },
  {
    "id": "yachie",
    "name": "Kicchō Yachie",
    "work": [
      "wbawc",
      "udoalg"
    ],
    "artworkCount": 8
  },
  {
    "id": "mayumi",
    "name": "Jōtōgū Mayumi",
    "work": [
      "wbawc"
    ],
    "artworkCount": 7
  },
  {
    "id": "keiki",
    "name": "Haniyasushin Keiki",
    "work": [
      "wbawc"
    ],
    "artworkCount": 8
  },
  {
    "id": "saki",
    "name": "Kurokoma Saki",
    "work": [
      "wbawc",
      "udoalg"
    ],
    "artworkCount": 3
  },
  {
    "id": "miyoi",
    "name": "Okunoda Miyoi",
    "work": [
      "le"
    ],
    "artworkCount": 2
  },
  {
    "id": "mizuchi",
    "name": "Miyadeguchi Mizuchi",
    "work": [
      "fds"
    ],
    "artworkCount": 5
  },
  {
    "id": "yuuma",
    "name": "Tōtetsu Yūma",
    "work": [
      "sfw",
      "udoalg"
    ],
    "artworkCount": 8
  },
  {
    "id": "mike",
    "name": "Gōtokuji Mike",
    "work": [
      "um"
    ],
    "artworkCount": 2
  },
  {
    "id": "takane",
    "name": "Yamashiro Takane",
    "work": [
      "um"
    ],
    "artworkCount": 1
  },
  {
    "id": "sannyo",
    "name": "Komakusa Sannyo",
    "work": [
      "um"
    ],
    "artworkCount": 1
  },
  {
    "id": "misumaru",
    "name": "Tamatsukuri Misumaru",
    "work": [
      "um"
    ],
    "artworkCount": 2
  },
  {
    "id": "tsukasa",
    "name": "Kudamaki Tsukasa",
    "work": [
      "um",
      "udoalg"
    ],
    "artworkCount": 16
  },
  {
    "id": "megumu",
    "name": "Iizunamaru Megumu",
    "work": [
      "um"
    ],
    "artworkCount": 8
  },
  {
    "id": "chimata",
    "name": "Tenkyū Chimata",
    "work": [
      "um"
    ],
    "artworkCount": 4
  },
  {
    "id": "momoyo",
    "name": "Himemushi Momoyo",
    "work": [
      "um"
    ],
    "artworkCount": 3
  },
  {
    "id": "biten",
    "name": "Son Biten",
    "work": [
      "udoalg"
    ],
    "artworkCount": 2
  },
  {
    "id": "enoko",
    "name": "Mitsugashira Enoko",
    "work": [
      "udoalg"
    ],
    "artworkCount": 1
  },
  {
    "id": "chiyari",
    "name": "Tenkajin Chiyari",
    "work": [
      "udoalg"
    ],
    "artworkCount": 1
  },
  {
    "id": "hisami",
    "name": "Yomotsu Hisami",
    "work": [
      "udoalg"
    ],
    "artworkCount": 1
  },
  {
    "id": "zanmu",
    "name": "Nippaku Zanmu",
    "work": [
      "udoalg"
    ],
    "artworkCount": 0
  },
  {
    "id": "ubame",
    "name": "Chirizuka Ubame",
    "work": [
      "fw"
    ],
    "artworkCount": 0
  },
  {
    "id": "chimi",
    "name": "Hōjū Chimi",
    "work": [
      "fw"
    ],
    "artworkCount": 0
  },
  {
    "id": "nareko",
    "name": "Michigami Nareko",
    "work": [
      "fw"
    ],
    "artworkCount": 0
  }
];
const artists = [
  {
    "id": "gyoza",
    "name": "ギョーザ",
    "linkTwitter": "https://x.com/ThGyouza",
    "artworkCount": 2
  },
  {
    "id": "shichimi",
    "name": "しちみ",
    "linkTwitter": "https://x.com/roll08081227",
    "linkPixiv": "https://www.pixiv.net/en/users/6083003",
    "artworkCount": 4
  },
  {
    "id": "ebi",
    "name": "えび",
    "linkTwitter": "https://x.com/hua88331",
    "artworkCount": 14
  },
  {
    "id": "youyume",
    "name": "妖夢くん",
    "linkTwitter": "https://x.com/youmu0225",
    "linkPixiv": "https://www.pixiv.net/en/users/68480688",
    "artworkCount": 6
  },
  {
    "id": "owata",
    "name": "おわーー",
    "linkTwitter": "https://x.com/OWATA12129",
    "artworkCount": 1
  },
  {
    "id": "tatekae",
    "name": "盾返",
    "linkTwitter": "https://x.com/Aeginflash",
    "artworkCount": 1
  },
  {
    "id": "gokuu",
    "name": "ごくう",
    "linkTwitter": "https://x.com/acoloredpencil",
    "linkPixiv": "https://www.pixiv.net/en/users/4006924",
    "artworkCount": 3
  },
  {
    "id": "oegaki_daisuki",
    "name": "お絵描き大好き",
    "linkPixiv": "https://www.pixiv.net/en/users/46836693",
    "artworkCount": 1
  },
  {
    "id": "deetamu",
    "name": "で～たむ",
    "linkTwitter": "https://x.com/simerike5",
    "linkPixiv": "https://www.pixiv.net/en/users/3079181",
    "artworkCount": 28
  },
  {
    "id": "enoki",
    "name": "えのき",
    "linkTwitter": "https://x.com/enoki_5689",
    "artworkCount": 6
  },
  {
    "id": "mochitose_aguri",
    "name": "餅千歳あぐり",
    "linkTwitter": "https://x.com/mochitoseaguri",
    "linkPixiv": "https://www.pixiv.net/en/users/61028298",
    "artworkCount": 1
  },
  {
    "id": "merihari",
    "name": "乙張",
    "linkTwitter": "https://x.com/merihari07",
    "linkPixiv": "https://www.pixiv.net/en/users/69758640",
    "artworkCount": 5
  },
  {
    "id": "kanpa",
    "name": "カンパ",
    "linkTwitter": "https://x.com/campagne_9",
    "linkPixiv": "https://www.pixiv.net/en/users/2520952",
    "artworkCount": 7
  },
  {
    "id": "urizaku",
    "name": "ウリザク",
    "linkTwitter": "https://x.com/urizaku3",
    "linkPixiv": "https://www.pixiv.net/en/users/14322558",
    "artworkCount": 1
  },
  {
    "id": "onyasai",
    "name": "おんやさい",
    "linkTwitter": "https://x.com/Oekaki_Onyasai",
    "linkPixiv": "https://www.pixiv.net/en/users/64531357",
    "artworkCount": 3
  },
  {
    "id": "zounose",
    "name": "ゾウノセ",
    "linkTwitter": "https://x.com/zounose",
    "linkPixiv": "https://www.pixiv.net/en/users/2622803",
    "artworkCount": 3
  },
  {
    "id": "ratenbo",
    "name": "ラテンボ",
    "linkTwitter": "https://x.com/ratenbo",
    "artworkCount": 1
  },
  {
    "id": "nodoguro",
    "name": "ノドグロ",
    "linkTwitter": "https://x.com/nodg671",
    "artworkCount": 1
  },
  {
    "id": "dokudoku_kanja",
    "name": "毒毒患者",
    "linkTwitter": "https://x.com/dk2_patient",
    "linkPixiv": "https://www.pixiv.net/en/users/86228831",
    "artworkCount": 1
  },
  {
    "id": "nunnun",
    "name": "ぬんぬん",
    "linkTwitter": "https://x.com/xyzspjp",
    "linkPixiv": "https://www.pixiv.net/en/users/450246",
    "artworkCount": 1
  },
  {
    "id": "teoi",
    "name": "健康な手負い",
    "linkTwitter": "https://x.com/MATEO2023_ex",
    "artworkCount": 5
  },
  {
    "id": "nantara",
    "name": "#なんたら#",
    "linkTwitter": "https://x.com/nantara3080",
    "linkPixiv": "https://www.pixiv.net/en/users/17879222",
    "artworkCount": 1
  },
  {
    "id": "shirosato",
    "name": "シロサト",
    "linkTwitter": "https://x.com/shirosato_town",
    "linkPixiv": "https://www.pixiv.net/en/users/358646",
    "artworkCount": 2
  },
  {
    "id": "mendou15",
    "name": "めんどう１５",
    "linkTwitter": "https://x.com/mendo_15___",
    "linkPixiv": "https://www.pixiv.net/en/users/83944581",
    "artworkCount": 14
  },
  {
    "id": "nekobatake",
    "name": "ネコバタケ",
    "linkTwitter": "https://x.com/catfiield",
    "linkPixiv": "https://www.pixiv.net/en/users/561777",
    "artworkCount": 1
  },
  {
    "id": "shundou_heishirou",
    "name": "春藤平四郎",
    "linkTwitter": "https://x.com/murabito3d2dVer",
    "linkPixiv": "https://www.pixiv.net/en/users/18584869",
    "artworkCount": 2
  },
  {
    "id": "fusu",
    "name": "ふす",
    "linkPixiv": "https://www.pixiv.net/en/users/30675161",
    "artworkCount": 1
  },
  {
    "id": "suwaneko",
    "name": "すわ猫",
    "linkTwitter": "https://x.com/suwaneko10",
    "linkPixiv": "https://www.pixiv.net/en/users/31855616",
    "artworkCount": 9
  },
  {
    "id": "mun",
    "name": "MUN",
    "linkPixiv": "https://www.pixiv.net/en/users/259570",
    "artworkCount": 2
  },
  {
    "id": "6hp",
    "name": "6HP",
    "linkTwitter": "https://x.com/S_Mika2000",
    "artworkCount": 1
  },
  {
    "id": "chuumukade",
    "name": "チュウムカデ",
    "linkTwitter": "https://x.com/TYUMUKADE",
    "linkPixiv": "https://www.pixiv.net/en/users/19115802",
    "artworkCount": 30
  },
  {
    "id": "poyo",
    "name": "ぽよすけ・ポークハム。",
    "linkTwitter": "https://x.com/PoyosukePorkham",
    "linkPixiv": "https://www.pixiv.net/en/users/9300932",
    "artworkCount": 1
  },
  {
    "id": "konna_reshiki",
    "name": "紺奈れしき",
    "linkTwitter": "https://x.com/konna_reshiki",
    "linkPixiv": "https://www.pixiv.net/en/users/79577634",
    "artworkCount": 5
  },
  {
    "id": "zannen_na_hito",
    "name": "残念な人",
    "linkTwitter": "https://x.com/Zannnenn1",
    "linkPixiv": "https://www.pixiv.net/en/users/1710240",
    "artworkCount": 2
  },
  {
    "id": "hidaruma",
    "name": "ヒダルマ",
    "linkTwitter": "https://x.com/hidaruma_",
    "linkPixiv": "https://www.pixiv.net/en/users/369449",
    "artworkCount": 18
  },
  {
    "id": "iroiro_yaru_hito",
    "name": "いろいろやる人",
    "linkTwitter": "https://x.com/iro2do",
    "linkPixiv": "https://www.pixiv.net/en/users/1341860",
    "artworkCount": 7
  },
  {
    "id": "kanae_ritsu",
    "name": "奏映りつ",
    "linkTwitter": "https://x.com/ri_tu49",
    "linkPixiv": "https://www.pixiv.net/en/users/42919445",
    "artworkCount": 1
  },
  {
    "id": "chitose_hachi",
    "name": "千歳はち",
    "linkTwitter": "https://x.com/Seachicken674",
    "linkPixiv": "https://www.pixiv.net/en/users/21620009",
    "artworkCount": 6
  },
  {
    "id": "hijiki",
    "name": "ひじき",
    "linkTwitter": "https://x.com/hijiri_st",
    "linkPixiv": "https://www.pixiv.net/en/users/622362",
    "artworkCount": 1
  },
  {
    "id": "seele",
    "name": "Seele",
    "linkTwitter": "https://x.com/chanseele0128",
    "linkPixiv": "https://www.pixiv.net/en/users/16729214",
    "artworkCount": 13
  },
  {
    "id": "fuko",
    "name": "fuko*",
    "linkTwitter": "https://x.com/kyunmarifukko",
    "linkPixiv": "https://www.pixiv.net/en/users/3127780",
    "artworkCount": 2
  },
  {
    "id": "shiki_do",
    "name": "敷ド",
    "linkTwitter": "https://x.com/siki_door",
    "linkPixiv": "https://www.pixiv.net/en/users/3581760",
    "artworkCount": 1
  },
  {
    "id": "haruwaka_noroshi",
    "name": "春若のろし",
    "linkTwitter": "https://x.com/haruwaka_064",
    "linkPixiv": "https://www.pixiv.net/en/users/1938163",
    "artworkCount": 3
  },
  {
    "id": "yukiya_nagi",
    "name": "雪屋ナギ",
    "linkTwitter": "https://x.com/saimu_taju",
    "linkPixiv": "https://www.pixiv.net/en/users/88451057",
    "artworkCount": 3
  },
  {
    "id": "purabird",
    "name": "ぷらばーど",
    "linkTwitter": "https://x.com/purabird0370",
    "artworkCount": 5
  },
  {
    "id": "masaki",
    "name": "正木",
    "linkTwitter": "https://x.com/koge_masaki",
    "artworkCount": 2
  },
  {
    "id": "kappy",
    "name": "カッピ",
    "linkTwitter": "https://x.com/kappy745",
    "artworkCount": 1
  },
  {
    "id": "mikazukimo",
    "name": "カッピ",
    "linkTwitter": "https://x.com/mikadukimo777",
    "linkPixiv": "https://www.pixiv.net/en/users/8543340",
    "artworkCount": 1
  },
  {
    "id": "yudepii",
    "name": "茹でピー",
    "linkTwitter": "https://x.com/Arachis_hypogae",
    "linkPixiv": "https://www.pixiv.net/en/users/264281",
    "artworkCount": 1
  },
  {
    "id": "soeo",
    "name": "そえお",
    "linkTwitter": "https://x.com/nuru_sawa",
    "linkPixiv": "https://www.pixiv.net/en/users/62901658",
    "artworkCount": 2
  },
  {
    "id": "lpis26",
    "name": "ルピス26",
    "linkTwitter": "https://x.com/Lpis26106",
    "linkPixiv": "https://www.pixiv.net/en/users/26971100",
    "artworkCount": 1
  },
  {
    "id": "nakache",
    "name": "なかちぇ",
    "linkTwitter": "https://x.com/na_ka_che",
    "artworkCount": 2
  },
  {
    "id": "sobayu_to_tempura",
    "name": "そばゆとてんぷら",
    "linkTwitter": "https://x.com/Sobayuto",
    "artworkCount": 5
  },
  {
    "id": "gohan_tabe",
    "name": "ごはんたべ",
    "linkTwitter": "https://x.com/haniwa_kue",
    "artworkCount": 3
  },
  {
    "id": "solidus",
    "name": "SOLIDUS",
    "linkTwitter": "https://x.com/sword_cube",
    "linkPixiv": "https://www.pixiv.net/en/users/14819041",
    "artworkCount": 7
  },
  {
    "id": "yimu",
    "name": "依穆_YiMu",
    "linkTwitter": "https://x.com/yimudesu",
    "linkPixiv": "https://www.pixiv.net/en/users/26593392",
    "artworkCount": 3
  },
  {
    "id": "maguton",
    "name": "まぐとん",
    "linkTwitter": "https://x.com/dhizegatton",
    "artworkCount": 2
  },
  {
    "id": "kanonari",
    "name": "カノナリ",
    "linkTwitter": "https://x.com/siturensindoro",
    "artworkCount": 5
  },
  {
    "id": "takana",
    "name": "タカナ",
    "linkTwitter": "https://x.com/takana957",
    "linkPixiv": "https://www.pixiv.net/en/users/15785302",
    "artworkCount": 1
  },
  {
    "id": "soregashi",
    "name": "それがし",
    "linkTwitter": "https://x.com/transfooorm",
    "artworkCount": 3
  },
  {
    "id": "shio",
    "name": "しお",
    "linkTwitter": "https://x.com/shioshio1600",
    "linkPixiv": "https://www.pixiv.net/en/users/2936205",
    "artworkCount": 10
  },
  {
    "id": "soborou",
    "name": "そぼ郎",
    "linkTwitter": "https://x.com/soboro_art0",
    "linkPixiv": "https://www.pixiv.net/en/users/4188695",
    "artworkCount": 4
  },
  {
    "id": "kunemushi",
    "name": "クネ虫",
    "linkTwitter": "https://x.com/tohokune",
    "artworkCount": 1
  },
  {
    "id": "shitace",
    "name": "したせ",
    "linkTwitter": "https://x.com/shitace1",
    "artworkCount": 2
  },
  {
    "id": "hashiro_fumi",
    "name": "葉城ふみ",
    "linkTwitter": "https://x.com/hashiro_san",
    "linkPixiv": "https://www.pixiv.net/en/users/23603829",
    "artworkCount": 1
  },
  {
    "id": "suzume_suzume",
    "name": "鈴眼すずめ",
    "linkTwitter": "https://x.com/suzukono_kiwami",
    "linkPixiv": "https://www.pixiv.net/en/users/89258338",
    "artworkCount": 3
  },
  {
    "id": "kourou",
    "name": "紅楼電力",
    "linkTwitter": "https://x.com/_KOUROU",
    "linkPixiv": "https://www.pixiv.net/en/users/30396530",
    "artworkCount": 1
  },
  {
    "id": "fugu_shogun",
    "name": "河豚将軍",
    "linkTwitter": "https://x.com/skhdrhcs",
    "artworkCount": 2
  },
  {
    "id": "zeroko_san",
    "name": "ぜろこさん",
    "linkTwitter": "https://x.com/9rtn",
    "artworkCount": 1
  },
  {
    "id": "rui",
    "name": "瑠依",
    "linkTwitter": "https://x.com/rui_ene_k",
    "linkPixiv": "https://www.pixiv.net/en/users/18533831",
    "artworkCount": 1
  },
  {
    "id": "zenji",
    "name": "ぜんじ",
    "linkTwitter": "https://x.com/zenji029",
    "linkPixiv": "https://www.pixiv.net/en/users/21114488",
    "artworkCount": 1
  },
  {
    "id": "tataragami",
    "name": "タタラガミ",
    "linkTwitter": "https://x.com/gennso8",
    "linkPixiv": "https://www.pixiv.net/en/users/16040636",
    "artworkCount": 1
  },
  {
    "id": "nekoda_maguro",
    "name": "猫田まぐろ",
    "linkTwitter": "https://x.com/nek0magur0",
    "artworkCount": 2
  },
  {
    "id": "kaasura",
    "name": "かーすら",
    "linkTwitter": "https://x.com/ihen590373",
    "artworkCount": 1
  },
  {
    "id": "ayaharu",
    "name": "あやはる",
    "linkTwitter": "https://x.com/Ayaharu_12",
    "linkPixiv": "https://www.pixiv.net/en/users/95929355",
    "artworkCount": 4
  },
  {
    "id": "kasuya_baian",
    "name": "粕家梅庵",
    "linkTwitter": "https://x.com/Kasuya_Baian",
    "linkPixiv": "https://www.pixiv.net/en/users/78872596",
    "artworkCount": 1
  },
  {
    "id": "ran",
    "name": "らん",
    "linkTwitter": "https://x.com/runker",
    "linkPixiv": "https://www.pixiv.net/en/users/1105169",
    "artworkCount": 2
  },
  {
    "id": "zumoten",
    "name": "ずもてん",
    "linkTwitter": "https://x.com/nubezon",
    "artworkCount": 2
  },
  {
    "id": "piaki",
    "name": "ぴあき",
    "linkTwitter": "https://x.com/NFWTKDaily",
    "linkPixiv": "https://www.pixiv.net/en/users/30130030",
    "artworkCount": 1
  },
  {
    "id": "tusk",
    "name": "タスク",
    "linkTwitter": "https://x.com/TUSKtouhou2",
    "artworkCount": 1
  },
  {
    "id": "yoshiko",
    "name": "良子",
    "linkTwitter": "https://x.com/ebihurai1",
    "linkPixiv": "https://www.pixiv.net/en/users/896208",
    "artworkCount": 1
  },
  {
    "id": "aka_tawashi",
    "name": "赤束子",
    "linkTwitter": "https://x.com/A_tawashi",
    "linkPixiv": "https://www.pixiv.net/en/users/359082",
    "artworkCount": 1
  },
  {
    "id": "inari",
    "name": "いなり",
    "linkTwitter": "https://x.com/yamadainari_",
    "artworkCount": 1
  },
  {
    "id": "kiyo_nuts",
    "name": "キヨナッツ",
    "linkTwitter": "x.com/stun_oyik",
    "artworkCount": 1
  },
  {
    "id": "kanisawa_yuuki",
    "name": "蟹沢ゆうき",
    "linkTwitter": "https://x.com/kanisawayuuki",
    "linkPixiv": "https://www.pixiv.net/en/users/16460779",
    "artworkCount": 1
  },
  {
    "id": "soraban_makura",
    "name": "そろばんまくら",
    "linkTwitter": "https://x.com/PxMiOtFnvZCO8bc",
    "artworkCount": 1
  },
  {
    "id": "hiiro",
    "name": "緋色",
    "linkTwitter": "https://x.com/hiiro_sp",
    "linkPixiv": "https://www.pixiv.net/en/users/116779",
    "artworkCount": 1
  },
  {
    "id": "amagappa",
    "name": "雨合羽",
    "linkTwitter": "https://x.com/raincoat_th13",
    "artworkCount": 1
  },
  {
    "id": "uramyai",
    "name": "うらみゃいさん",
    "linkTwitter": "https://x.com/uramyai",
    "artworkCount": 1
  },
  {
    "id": "sha_re",
    "name": "洒落",
    "linkTwitter": "https://x.com/shiya_re04",
    "artworkCount": 5
  },
  {
    "id": "kyuukei_usagi",
    "name": "休憩うさぎ",
    "linkTwitter": "https://x.com/QK_rabbit_2",
    "linkPixiv": "https://www.pixiv.net/en/users/15423708",
    "artworkCount": 2
  },
  {
    "id": "arugon",
    "name": "有るごん",
    "linkTwitter": "https://x.com/saint_yohannes",
    "linkPixiv": "https://www.pixiv.net/en/users/489831",
    "artworkCount": 5
  },
  {
    "id": "gunjokikai",
    "name": "鴨居能嵎",
    "linkTwitter": "https://x.com/harisuwa",
    "artworkCount": 1
  },
  {
    "id": "arinu",
    "name": "アリヌ",
    "linkTwitter": "https://x.com/arinutan",
    "linkPixiv": "https://www.pixiv.net/en/users/819273",
    "artworkCount": 2
  },
  {
    "id": "hebi_ichigo",
    "name": "ｻｰｸﾙ蛇苺",
    "linkTwitter": "https://x.com/hebiichigod",
    "artworkCount": 1
  },
  {
    "id": "chakomaru",
    "name": "ちゃこまる",
    "linkTwitter": "https://x.com/_chapo_o",
    "artworkCount": 1
  },
  {
    "id": "tamamo",
    "name": "稲荷山たまも",
    "linkTwitter": "https://x.com/sayakuropy",
    "linkPixiv": "https://www.pixiv.net/en/users/55155988",
    "artworkCount": 1
  },
  {
    "id": "sasa",
    "name": "sasa",
    "linkTwitter": "https://x.com/sasagume",
    "linkPixiv": "https://www.pixiv.net/en/users/20178521",
    "artworkCount": 1
  },
  {
    "id": "pechika",
    "name": "ペチカ",
    "linkTwitter": "https://x.com/Moijochu",
    "artworkCount": 1
  },
  {
    "id": "jun",
    "name": "純",
    "linkTwitter": "https://x.com/Jun_Jun_0319",
    "linkPixiv": "https://www.pixiv.net/en/users/110246613",
    "artworkCount": 1
  },
  {
    "id": "kajatony",
    "name": "kajatony",
    "linkTwitter": "https://x.com/kajatony_tweet",
    "linkPixiv": "https://www.pixiv.net/en/users/26750883",
    "artworkCount": 1
  },
  {
    "id": "q_sen",
    "name": "Q仙",
    "linkTwitter": "https://x.com/TwUwhmkrLRnnxH9",
    "artworkCount": 1
  },
  {
    "id": "orz",
    "name": "orz",
    "linkTwitter": "https://x.com/orz_torifune",
    "linkPixiv": "https://www.pixiv.net/en/users/73264281",
    "artworkCount": 1
  },
  {
    "id": "nukumori_karasu",
    "name": "ぬくもりからす",
    "linkTwitter": "https://x.com/NUC_crow",
    "linkPixiv": "https://www.pixiv.net/en/users/9910151",
    "artworkCount": 1
  },
  {
    "id": "tangerine_parfait",
    "name": "橘红色芭菲",
    "linkTwitter": "https://x.com/Parfait025",
    "linkPixiv": "https://www.pixiv.net/en/users/28850172",
    "artworkCount": 1
  },
  {
    "id": "itsumizu",
    "name": "いつみず",
    "linkTwitter": "https://x.com/itumizu_02",
    "linkPixiv": "https://www.pixiv.net/en/users/2662063",
    "artworkCount": 1
  },
  {
    "id": "sakuraba_medi",
    "name": "桜葉めディ",
    "linkTwitter": "https://x.com/momom_pancake",
    "linkPixiv": "https://www.pixiv.net/en/users/12057069",
    "artworkCount": 2
  },
  {
    "id": "tofuya",
    "name": "と〜ふや",
    "linkTwitter": "https://x.com/Otofu_seller",
    "linkPixiv": "https://www.pixiv.net/en/users/23151908",
    "artworkCount": 4
  },
  {
    "id": "kosaki",
    "name": "古崎",
    "linkTwitter": "https://x.com/sakiC43899",
    "artworkCount": 1
  },
  {
    "id": "rose_gardena",
    "name": "ろーずがーでな",
    "linkTwitter": "https://x.com/ikatyusya",
    "linkPixiv": "https://www.pixiv.net/en/users/6627849",
    "artworkCount": 1
  },
  {
    "id": "sannoji",
    "name": "三ノ字",
    "linkTwitter": "https://x.com/3WD_TKM",
    "artworkCount": 2
  },
  {
    "id": "itatatata",
    "name": "いたたたた",
    "linkTwitter": "https://x.com/itatatata6",
    "linkPixiv": "https://www.pixiv.net/en/users/29434482",
    "artworkCount": 2
  },
  {
    "id": "kna",
    "name": "Kna",
    "linkTwitter": "https://x.com/Kna28064212",
    "artworkCount": 2
  },
  {
    "id": "kumamoto",
    "name": "くまもと",
    "linkTwitter": "https://x.com/skmmt3",
    "linkPixiv": "https://www.pixiv.net/en/users/235005",
    "artworkCount": 1
  },
  {
    "id": "mochimugi",
    "name": "もち麦",
    "linkTwitter": "https://x.com/rwFt3BpgzZQk634",
    "artworkCount": 1
  },
  {
    "id": "yado",
    "name": "やどたいちょう",
    "linkTwitter": "https://x.com/yado_2b",
    "linkPixiv": "https://www.pixiv.net/en/users/4236058",
    "artworkCount": 1
  },
  {
    "id": "coco",
    "name": "Coco",
    "linkTwitter": "https://x.com/kokoIllustrator",
    "artworkCount": 1
  },
  {
    "id": "io",
    "name": "いお",
    "linkTwitter": "https://x.com/io_nano",
    "linkPixiv": "https://www.pixiv.net/en/users/323684",
    "artworkCount": 2
  },
  {
    "id": "opagi",
    "name": "opagi",
    "linkTwitter": "https://x.com/opagi",
    "linkPixiv": "https://www.pixiv.net/en/users/1872188",
    "artworkCount": 1
  },
  {
    "id": "satsuki",
    "name": "皐",
    "linkTwitter": "https://x.com/Stk________",
    "artworkCount": 1
  },
  {
    "id": "allcy49",
    "name": "allcy49",
    "linkTwitter": "https://x.com/allcy49",
    "linkPixiv": "https://www.pixiv.net/en/users/9916966",
    "artworkCount": 1
  },
  {
    "id": "ryoan",
    "name": "旅庵",
    "linkTwitter": "https://x.com/voyagehermitage",
    "linkPixiv": "https://www.pixiv.net/en/users/18849559",
    "artworkCount": 1
  },
  {
    "id": "k-osu",
    "name": "Kオス",
    "linkTwitter": "https://x.com/konton_hakusai",
    "linkPixiv": "https://www.pixiv.net/en/users/18058067",
    "artworkCount": 2
  },
  {
    "id": "kuya",
    "name": "KUYA",
    "linkTwitter": "https://x.com/hey36253625",
    "linkPixiv": "https://www.pixiv.net/en/users/22121352",
    "artworkCount": 1
  },
  {
    "id": "tanasuke",
    "name": "たなすけ",
    "linkTwitter": "https://x.com/_tanasuke_",
    "linkPixiv": "https://www.pixiv.net/en/users/2354684",
    "artworkCount": 1
  },
  {
    "id": "ratto",
    "name": "ratto",
    "linkTwitter": "https://x.com/mobilis_1870",
    "artworkCount": 1
  },
  {
    "id": "oriental_zenzai",
    "name": "オリエンタルぜんざい",
    "linkTwitter": "https://x.com/orientalzenzai",
    "artworkCount": 1
  },
  {
    "id": "unk",
    "name": "UNK教祖",
    "linkTwitter": "https://x.com/55unkman",
    "artworkCount": 2
  },
  {
    "id": "garasuno",
    "name": "がらすの",
    "linkTwitter": "https://x.com/garasuno_1182",
    "linkPixiv": "https://www.pixiv.net/en/users/64952535",
    "artworkCount": 1
  },
  {
    "id": "hidefu_kitayan",
    "name": "ひでふキタヤン",
    "linkTwitter": "https://x.com/WVTj73lGXvUJggy",
    "linkPixiv": "https://www.pixiv.net/en/users/6608305",
    "artworkCount": 1
  },
  {
    "id": "kongen",
    "name": "こんげん",
    "linkTwitter": "https://x.com/konngennnn",
    "artworkCount": 1
  },
  {
    "id": "muntarou",
    "name": "むん太郎",
    "linkTwitter": "https://x.com/nap_muntarou",
    "linkPixiv": "https://www.pixiv.net/en/users/19476011",
    "artworkCount": 5
  },
  {
    "id": "jarotan",
    "name": "じゃろたん",
    "linkTwitter": "https://x.com/jarotan_kolkol",
    "linkPixiv": "https://www.pixiv.net/en/users/27395061",
    "artworkCount": 1
  },
  {
    "id": "sniper",
    "name": "sniper",
    "linkTwitter": "https://x.com/sniper16783072",
    "artworkCount": 4
  },
  {
    "id": "fuuzasa",
    "name": "フウザサ",
    "linkTwitter": "https://x.com/fuuzasa",
    "linkPixiv": "https://www.pixiv.net/en/users/952754",
    "artworkCount": 1
  },
  {
    "id": "you",
    "name": "よう",
    "linkTwitter": "https://x.com/y8m38",
    "linkPixiv": "https://www.pixiv.net/en/users/3811484",
    "artworkCount": 1
  },
  {
    "id": "chaahan",
    "name": "炒飯",
    "linkTwitter": "https://x.com/fried_rice0614",
    "artworkCount": 1
  },
  {
    "id": "shigure",
    "name": "時雨",
    "linkTwitter": "https://x.com/sigure0210",
    "linkPixiv": "https://www.pixiv.net/en/users/81295706",
    "artworkCount": 1
  },
  {
    "id": "jiru",
    "name": "じる",
    "linkTwitter": "https://x.com/jirufun",
    "linkPixiv": "https://www.pixiv.net/en/users/75677",
    "artworkCount": 1
  },
  {
    "id": "yanotsuki",
    "name": "ヤノツキ",
    "linkTwitter": "x.com/yanotsuki8",
    "artworkCount": 1
  },
  {
    "id": "refuson_man",
    "name": "れふそんマン",
    "linkTwitter": "https://x.com/kou114z",
    "linkPixiv": "https://www.pixiv.net/en/users/45763272",
    "artworkCount": 1
  },
  {
    "id": "sayoshima",
    "name": "小夜島",
    "linkTwitter": "https://x.com/sayoshima",
    "artworkCount": 1
  },
  {
    "id": "erakokyuu",
    "name": "鰓呼吸",
    "linkTwitter": "https://x.com/erakokyu01",
    "linkPixiv": "https://www.pixiv.net/en/users/67889725",
    "artworkCount": 2
  },
  {
    "id": "morino_hon",
    "name": "もりのほん",
    "linkTwitter": "https://x.com/morinohon",
    "linkPixiv": "https://www.pixiv.net/en/users/258411",
    "artworkCount": 1
  },
  {
    "id": "niru",
    "name": "niru",
    "linkTwitter": "https://x.com/niru___05",
    "linkPixiv": "https://www.pixiv.net/en/users/38334959",
    "artworkCount": 2
  },
  {
    "id": "marinne",
    "name": "まりんね",
    "linkTwitter": "https://x.com/marinne_mkmk777",
    "linkPixiv": "https://www.pixiv.net/en/users/31551243",
    "artworkCount": 2
  },
  {
    "id": "kinmugi",
    "name": "きんむぎ",
    "linkTwitter": "https://x.com/exkagerou8665",
    "artworkCount": 1
  },
  {
    "id": "john_mcclane",
    "name": "ぢょん@まくれーん",
    "linkTwitter": "https://x.com/dyon_McClane",
    "linkPixiv": "https://www.pixiv.net/en/users/237670",
    "artworkCount": 1
  },
  {
    "id": "nama",
    "name": "なま",
    "linkTwitter": "https://x.com/gyonihara",
    "artworkCount": 1
  },
  {
    "id": "senmura",
    "name": "Senmura",
    "linkTwitter": "https://x.com/main_senmura",
    "linkPixiv": "https://www.pixiv.net/en/users/82120650",
    "artworkCount": 1
  },
  {
    "id": "paryan",
    "name": "ぱーやん",
    "linkTwitter": "https://x.com/paryan2010",
    "linkPixiv": "https://www.pixiv.net/en/users/671079",
    "artworkCount": 1
  },
  {
    "id": "tog.",
    "name": "tog.",
    "linkTwitter": "https://x.com/flexible_B",
    "linkPixiv": "https://www.pixiv.net/en/users/192808",
    "artworkCount": 1
  },
  {
    "id": "shirai_u",
    "name": "白柚",
    "linkTwitter": "https://x.com/Yuzu12188491908",
    "linkPixiv": "https://www.pixiv.net/en/users/109731912",
    "artworkCount": 1
  },
  {
    "id": "yuzugoori",
    "name": "ゆずごおり",
    "linkTwitter": "https://x.com/yuzutokoori",
    "artworkCount": 2
  },
  {
    "id": "zakozako_y",
    "name": "ザコザコY",
    "linkTwitter": "https://x.com/zakozakoY",
    "linkPixiv": "https://www.pixiv.net/en/users/3027596",
    "artworkCount": 1
  },
  {
    "id": "whis",
    "name": "うぃす",
    "linkTwitter": "https://x.com/whis11",
    "linkPixiv": "https://www.pixiv.net/en/users/135786",
    "artworkCount": 2
  },
  {
    "id": "myonmyon",
    "name": "魂魄愛妻家",
    "linkTwitter": "https://x.com/myonmyonIllust",
    "artworkCount": 1
  },
  {
    "id": "omaega",
    "name": "おまえが",
    "linkTwitter": "https://x.com/omaega_chan",
    "linkPixiv": "https://www.pixiv.net/en/users/109614847",
    "artworkCount": 1
  },
  {
    "id": "kemo_chiharu",
    "name": "けも　ちはる",
    "linkTwitter": "https://x.com/kemochiharu717",
    "linkPixiv": "https://www.pixiv.net/en/users/5355377",
    "artworkCount": 1
  },
  {
    "id": "hisame_yu",
    "name": "ひさめ湯",
    "linkTwitter": "https://x.com/ut0wv",
    "artworkCount": 1
  },
  {
    "id": "rokugou",
    "name": "六合ダイスケ",
    "linkTwitter": "https://x.com/rokugou",
    "linkPixiv": "https://www.pixiv.net/en/users/1946476",
    "artworkCount": 1
  },
  {
    "id": "kajiya",
    "name": "鍛冶屋",
    "linkTwitter": "https://x.com/th_KAJIYA",
    "artworkCount": 1
  },
  {
    "id": "kiritani",
    "name": "桐谷",
    "linkTwitter": "https://x.com/kiri_tani_",
    "artworkCount": 1
  },
  {
    "id": "rengthic",
    "name": "rengthic",
    "linkTwitter": "https://x.com/rengthic",
    "artworkCount": 1
  },
  {
    "id": "shioshio",
    "name": "しおしお",
    "linkTwitter": "https://x.com/betabetarimocon",
    "linkPixiv": "https://www.pixiv.net/en/users/8852877",
    "artworkCount": 1
  },
  {
    "id": "kouba",
    "name": "こうば",
    "linkTwitter": "https://x.com/kou_baa",
    "linkPixiv": "https://www.pixiv.net/en/users/1304081",
    "artworkCount": 1
  },
  {
    "id": "azuki",
    "name": "アズキ",
    "linkTwitter": "https://x.com/azukiranatuine",
    "linkPixiv": "https://www.pixiv.net/en/users/445565",
    "artworkCount": 1
  },
  {
    "id": "en",
    "name": "焉",
    "linkTwitter": "https://x.com/_fleuriste",
    "linkPixiv": "https://www.pixiv.net/en/users/24347128",
    "artworkCount": 1
  },
  {
    "id": "nayutanen",
    "name": "なゆたんえん",
    "linkTwitter": "https://x.com/nayutanen",
    "linkPixiv": "https://www.pixiv.net/en/users/49654495",
    "artworkCount": 1
  },
  {
    "id": "noai_nioshi",
    "name": "野愛におし",
    "linkTwitter": "https://x.com/nioshi_noai",
    "linkPixiv": "https://www.pixiv.net/en/users/246328",
    "artworkCount": 1
  },
  {
    "id": "shay",
    "name": "シェイ",
    "linkTwitter": "https://x.com/ShayyyTeraO",
    "linkPixiv": "https://www.pixiv.net/en/users/67949568",
    "artworkCount": 1
  },
  {
    "id": "aotake_seijirou",
    "name": "青竹せいじろう",
    "linkTwitter": "https://x.com/aotksejiro",
    "linkPixiv": "https://www.pixiv.net/en/users/16142952",
    "artworkCount": 1
  },
  {
    "id": "kontamaruna",
    "name": "こんたまるな",
    "linkTwitter": "https://x.com/LoLK_m",
    "linkPixiv": "https://www.pixiv.net/en/users/104705331",
    "artworkCount": 1
  },
  {
    "id": "signal_mass",
    "name": "坂本しぐま",
    "linkTwitter": "https://x.com/SignalMass",
    "artworkCount": 1
  },
  {
    "id": "shigefumi",
    "name": "しげふみ",
    "linkTwitter": "https://x.com/baystarsapphire",
    "linkPixiv": "https://www.pixiv.net/en/users/57296736",
    "artworkCount": 1
  },
  {
    "id": "increase",
    "name": "いんくりーす",
    "linkTwitter": "https://x.com/increase_konbu",
    "artworkCount": 1
  },
  {
    "id": "hawatari",
    "name": "、",
    "linkTwitter": "https://x.com/h_hawatari",
    "artworkCount": 1
  },
  {
    "id": "jiyuu_toppa",
    "name": "自由突破",
    "linkTwitter": "https://x.com/594musou",
    "linkPixiv": "https://www.pixiv.net/en/users/12915048",
    "artworkCount": 1
  },
  {
    "id": "hatome",
    "name": "はとめ",
    "linkTwitter": "https://x.com/hatomehonpoo",
    "linkPixiv": "https://www.pixiv.net/en/users/65904984",
    "artworkCount": 1
  }
];
/*! src/components/ListPage/ListPage.tsx [vike:pluginModuleBanner] */
const MODE_CHARACTER = "character";
const BASE_URL = "/touhou-translations/";
const ListPage = ({ mode }) => {
  const items = mode === MODE_CHARACTER ? characters : artists;
  const title = mode === MODE_CHARACTER ? "Character List" : "Artist List";
  const ariaLabel = mode === MODE_CHARACTER ? "Search Characters" : "Search Artists";
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const search = (data, query) => data.filter(
    ({ id, name }) => [id, name].some((field) => field.toLowerCase().includes(query.toLowerCase()))
  );
  const sort = (data, order) => order === "none" ? data : [...data].sort(
    (a, b) => order === "asc" ? a.artworkCount - b.artworkCount : b.artworkCount - a.artworkCount
  );
  const searchedItems = useMemo(() => search(items, searchQuery), [items, searchQuery]);
  const sortedItems = useMemo(() => sort(searchedItems, sortOrder), [searchedItems, sortOrder]);
  const toggleSortOrder = () => setSortOrder((prev) => prev === "none" ? "desc" : prev === "desc" ? "asc" : "none");
  const renderListItems = () => {
    return sortedItems.map((item) => {
      const isCharacter = mode === MODE_CHARACTER;
      const id = item.id;
      const name = item.name;
      const artworkCountText = `${item.artworkCount} artwork${item.artworkCount !== 1 ? "s" : ""}`;
      const imageUrl = isCharacter ? getCharacterPortraits(id) : getArtistPortraits(id);
      const toUrl = isCharacter ? `${BASE_URL}gallery?character=${id}` : `${BASE_URL}gallery?artist=${id}`;
      return /* @__PURE__ */ jsx(ProfileItem, { name, imageUrl, description: artworkCountText, link: toUrl }, id);
    });
  };
  useEffect(() => {
    const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "lg", sx: styles.container, children: [
    /* @__PURE__ */ jsxs(Box, { sx: styles.box, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", component: "h2", sx: styles.typography, children: title }),
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Search by ID or Name",
          variant: "outlined",
          value: searchInput,
          sx: styles.textField,
          onChange: (e) => setSearchInput(e.target.value),
          slotProps: { input: { "aria-label": ariaLabel } }
        }
      ),
      /* @__PURE__ */ jsx(ArtworkCountSortIconButton, { sortOrder, onToggleSortOrder: toggleSortOrder })
    ] }),
    /* @__PURE__ */ jsx(Box, { component: "ul", sx: styles.listGrid, children: renderListItems() })
  ] });
};
export {
  ListPage as L
};
