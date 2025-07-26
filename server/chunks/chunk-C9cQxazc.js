import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { navigate } from "vike/client/router";
import { Paper, Box, Typography, Avatar } from "@mui/material";
/*! src/icons/characters/portraits/akyuu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_0 = "/touhou-translations/assets/static/akyuu.C69V-hwO.webp";
/*! src/icons/characters/portraits/alice.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_1 = "/touhou-translations/assets/static/alice.DEWrPtVD.webp";
/*! src/icons/characters/portraits/aun.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_2 = "/touhou-translations/assets/static/aun.D_HfZlaI.webp";
/*! src/icons/characters/portraits/aya.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_3 = "/touhou-translations/assets/static/aya.Bs9Y13l-.webp";
/*! src/icons/characters/portraits/benben.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_4 = "/touhou-translations/assets/static/benben.Ytj66Qhq.webp";
/*! src/icons/characters/portraits/biten.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_5 = "/touhou-translations/assets/static/biten.DLfxQy1N.webp";
/*! src/icons/characters/portraits/byakuren.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_6 = "/touhou-translations/assets/static/byakuren.DWOIa2Ie.webp";
/*! src/icons/characters/portraits/chen.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_7 = "/touhou-translations/assets/static/chen.D3RPODWp.webp";
/*! src/icons/characters/portraits/chimata.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_8 = "/touhou-translations/assets/static/chimata.Cj95g3bK.webp";
/*! src/icons/characters/portraits/chimi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_9 = "/touhou-translations/assets/static/chimi.Dpj7AW8n.webp";
/*! src/icons/characters/portraits/chiyari.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_10 = "/touhou-translations/assets/static/chiyari.zV8v2pw2.webp";
/*! src/icons/characters/portraits/cirno.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_11 = "/touhou-translations/assets/static/cirno.CA_TJo0W.webp";
/*! src/icons/characters/portraits/clownpiece.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_12 = "/touhou-translations/assets/static/clownpiece.Dqn57-ur.webp";
/*! src/icons/characters/portraits/daiyousei.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_13 = "/touhou-translations/assets/static/daiyousei.D0S_Y_RO.webp";
/*! src/icons/characters/portraits/doremy.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_14 = "/touhou-translations/assets/static/doremy.CaNSoIp1.webp";
/*! src/icons/characters/portraits/eika.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_15 = "/touhou-translations/assets/static/eika.BzCV04m1.webp";
/*! src/icons/characters/portraits/eiki.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_16 = "/touhou-translations/assets/static/eiki.C74mpl1r.webp";
/*! src/icons/characters/portraits/eirin.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_17 = "/touhou-translations/assets/static/eirin.CeAjhyYI.webp";
/*! src/icons/characters/portraits/enoko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_18 = "/touhou-translations/assets/static/enoko.I1lYfMvP.webp";
/*! src/icons/characters/portraits/flandre.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_19 = "/touhou-translations/assets/static/flandre.BLUghg1_.webp";
/*! src/icons/characters/portraits/futo.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_20 = "/touhou-translations/assets/static/futo.C1C5nsSy.webp";
/*! src/icons/characters/portraits/hatate.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_21 = "/touhou-translations/assets/static/hatate.BxdBaS34.webp";
/*! src/icons/characters/portraits/hecatia.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_22 = "/touhou-translations/assets/static/hecatia.C9iWXdRA.webp";
/*! src/icons/characters/portraits/hina.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_23 = "/touhou-translations/assets/static/hina.JkBOeqJ2.webp";
/*! src/icons/characters/portraits/hisami.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_24 = "/touhou-translations/assets/static/hisami.CYQrWK7L.webp";
/*! src/icons/characters/portraits/ichirin.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_25 = "/touhou-translations/assets/static/ichirin.DhWuF_Os.webp";
/*! src/icons/characters/portraits/iku.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_26 = "/touhou-translations/assets/static/iku.De8FgQlE.webp";
/*! src/icons/characters/portraits/joon.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_27 = "/touhou-translations/assets/static/joon.DjtqZgfy.webp";
/*! src/icons/characters/portraits/junko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_28 = "/touhou-translations/assets/static/junko.BBANMAB1.webp";
/*! src/icons/characters/portraits/kagerou.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_29 = "/touhou-translations/assets/static/kagerou.Dj4oHlwd.webp";
/*! src/icons/characters/portraits/kaguya.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_30 = "/touhou-translations/assets/static/kaguya.CLRDTD9n.webp";
/*! src/icons/characters/portraits/kanako.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_31 = "/touhou-translations/assets/static/kanako.C8rnenIZ.webp";
/*! src/icons/characters/portraits/kasen.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_32 = "/touhou-translations/assets/static/kasen.jnZ2smjy.webp";
/*! src/icons/characters/portraits/keiki.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_33 = "/touhou-translations/assets/static/keiki.BSOuRXDq.webp";
/*! src/icons/characters/portraits/keine.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_34 = "/touhou-translations/assets/static/keine.CAtNTHWx.webp";
/*! src/icons/characters/portraits/kisume.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_35 = "/touhou-translations/assets/static/kisume.DobJ-IEg.webp";
/*! src/icons/characters/portraits/koakuma.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_36 = "/touhou-translations/assets/static/koakuma.DJjj9tZj.webp";
/*! src/icons/characters/portraits/kogasa.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_37 = "/touhou-translations/assets/static/kogasa.KHduT5pf.webp";
/*! src/icons/characters/portraits/koishi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_38 = "/touhou-translations/assets/static/koishi.BL-lY-F6.webp";
/*! src/icons/characters/portraits/kokoro.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_39 = "/touhou-translations/assets/static/kokoro.DS2ClGkp.webp";
/*! src/icons/characters/portraits/komachi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_40 = "/touhou-translations/assets/static/komachi.L8L92kb_.webp";
/*! src/icons/characters/portraits/kosuzu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_41 = "/touhou-translations/assets/static/kosuzu.DPgi6H3Q.webp";
/*! src/icons/characters/portraits/kutaka.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_42 = "/touhou-translations/assets/static/kutaka.Dt9yvZc9.webp";
/*! src/icons/characters/portraits/kyouko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_43 = "/touhou-translations/assets/static/kyouko.5M3R7cij.webp";
/*! src/icons/characters/portraits/larva.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_44 = "/touhou-translations/assets/static/larva.4hx_f6YY.webp";
/*! src/icons/characters/portraits/letty.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_45 = "/touhou-translations/assets/static/letty.jyn5_NeS.webp";
/*! src/icons/characters/portraits/lily.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_46 = "/touhou-translations/assets/static/lily.CsREB__H.webp";
/*! src/icons/characters/portraits/luna.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_47 = "/touhou-translations/assets/static/luna.BGayZBEX.webp";
/*! src/icons/characters/portraits/lunasa.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_48 = "/touhou-translations/assets/static/lunasa.CWPOABVW.webp";
/*! src/icons/characters/portraits/lyrica.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_49 = "/touhou-translations/assets/static/lyrica.C0qieuh9.webp";
/*! src/icons/characters/portraits/mai.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_50 = "/touhou-translations/assets/static/mai.muoLaYA1.webp";
/*! src/icons/characters/portraits/mamizou.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_51 = "/touhou-translations/assets/static/mamizou.BKMs-FO6.webp";
/*! src/icons/characters/portraits/marisa.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_52 = "/touhou-translations/assets/static/marisa.CZhW6VWk.webp";
/*! src/icons/characters/portraits/mayumi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_53 = "/touhou-translations/assets/static/mayumi.BoUMdqvX.webp";
/*! src/icons/characters/portraits/medicine.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_54 = "/touhou-translations/assets/static/medicine.l6Hs00s6.webp";
/*! src/icons/characters/portraits/megumu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_55 = "/touhou-translations/assets/static/megumu.t0yxXRZh.webp";
/*! src/icons/characters/portraits/meiling.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_56 = "/touhou-translations/assets/static/meiling.W-3xdGWO.webp";
/*! src/icons/characters/portraits/merlin.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_57 = "/touhou-translations/assets/static/merlin.CDn4uvRE.webp";
/*! src/icons/characters/portraits/merry.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_58 = "/touhou-translations/assets/static/merry.PR3U4dgG.webp";
/*! src/icons/characters/portraits/mike.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_59 = "/touhou-translations/assets/static/mike.DleuvbGd.webp";
/*! src/icons/characters/portraits/miko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_60 = "/touhou-translations/assets/static/miko.B2qe8vJN.webp";
/*! src/icons/characters/portraits/minamitsu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_61 = "/touhou-translations/assets/static/minamitsu.Cy7at_Tr.webp";
/*! src/icons/characters/portraits/minoriko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_62 = "/touhou-translations/assets/static/minoriko.x6jOvZ8O.webp";
/*! src/icons/characters/portraits/misumaru.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_63 = "/touhou-translations/assets/static/misumaru.BnYkETwI.webp";
/*! src/icons/characters/portraits/miyoi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_64 = "/touhou-translations/assets/static/miyoi.u_OBKgQc.webp";
/*! src/icons/characters/portraits/mizuchi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_65 = "/touhou-translations/assets/static/mizuchi.CVQwQue7.webp";
/*! src/icons/characters/portraits/mokou.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_66 = "/touhou-translations/assets/static/mokou.B3M7vhfF.webp";
/*! src/icons/characters/portraits/momiji.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_67 = "/touhou-translations/assets/static/momiji.Cpt-G1Lp.webp";
/*! src/icons/characters/portraits/momoyo.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_68 = "/touhou-translations/assets/static/momoyo.LtU2XOR6.webp";
/*! src/icons/characters/portraits/mystia.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_69 = "/touhou-translations/assets/static/mystia.r5J6ne7k.webp";
/*! src/icons/characters/portraits/nareko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_70 = "/touhou-translations/assets/static/nareko.DK_7Hbdp.webp";
/*! src/icons/characters/portraits/narumi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_71 = "/touhou-translations/assets/static/narumi.ygb29z-d.webp";
/*! src/icons/characters/portraits/nazrin.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_72 = "/touhou-translations/assets/static/nazrin.B1c3Jjy9.webp";
/*! src/icons/characters/portraits/nemuno.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_73 = "/touhou-translations/assets/static/nemuno.CYtUZT6t.webp";
/*! src/icons/characters/portraits/nitori.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_74 = "/touhou-translations/assets/static/nitori.DSTVTThY.webp";
/*! src/icons/characters/portraits/nue.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_75 = "/touhou-translations/assets/static/nue.DIAfMs9-.webp";
/*! src/icons/characters/portraits/okina.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_76 = "/touhou-translations/assets/static/okina.BVGiO8tw.webp";
/*! src/icons/characters/portraits/okuu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_77 = "/touhou-translations/assets/static/okuu.CzgoZxUG.webp";
/*! src/icons/characters/portraits/orin.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_78 = "/touhou-translations/assets/static/orin.6pWkVbQB.webp";
/*! src/icons/characters/portraits/parsee.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_79 = "/touhou-translations/assets/static/parsee.BpzemPrK.webp";
/*! src/icons/characters/portraits/patchouli.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_80 = "/touhou-translations/assets/static/patchouli.C2m0mcG9.webp";
/*! src/icons/characters/portraits/raiko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_81 = "/touhou-translations/assets/static/raiko.C-iUDF0o.webp";
/*! src/icons/characters/portraits/ran.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_82 = "/touhou-translations/assets/static/ran.8unJONnr.webp";
/*! src/icons/characters/portraits/reimu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_83 = "/touhou-translations/assets/static/reimu.C--l9llF.webp";
/*! src/icons/characters/portraits/reisen.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_84 = "/touhou-translations/assets/static/reisen.nACCzEzk.webp";
/*! src/icons/characters/portraits/reisen2.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_85 = "/touhou-translations/assets/static/reisen2.DqgDg5w6.webp";
/*! src/icons/characters/portraits/remilia.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_86 = "/touhou-translations/assets/static/remilia.DsxaxEe-.webp";
/*! src/icons/characters/portraits/renko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_87 = "/touhou-translations/assets/static/renko.bsQAGzxE.webp";
/*! src/icons/characters/portraits/rin.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_88 = "/touhou-translations/assets/static/rin.C6XG6Wo5.webp";
/*! src/icons/characters/portraits/ringo.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_89 = "/touhou-translations/assets/static/ringo.BUNgKmre.webp";
/*! src/icons/characters/portraits/rinnosuke.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_90 = "/touhou-translations/assets/static/rinnosuke.CMj8xLNj.webp";
/*! src/icons/characters/portraits/rumia.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_91 = "/touhou-translations/assets/static/rumia.CEJzBkrJ.webp";
/*! src/icons/characters/portraits/sagume.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_92 = "/touhou-translations/assets/static/sagume.DAz_NJma.webp";
/*! src/icons/characters/portraits/saki.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_93 = "/touhou-translations/assets/static/saki.D4gI-BHr.webp";
/*! src/icons/characters/portraits/sakuya.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_94 = "/touhou-translations/assets/static/sakuya.D4ymbzg7.webp";
/*! src/icons/characters/portraits/sanae.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_95 = "/touhou-translations/assets/static/sanae.Dt2nYCys.webp";
/*! src/icons/characters/portraits/sannyo.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_96 = "/touhou-translations/assets/static/sannyo.exfI1nw6.webp";
/*! src/icons/characters/portraits/satono.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_97 = "/touhou-translations/assets/static/satono.HF6-3LSt.webp";
/*! src/icons/characters/portraits/satori.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_98 = "/touhou-translations/assets/static/satori.Kgyqy3p7.webp";
/*! src/icons/characters/portraits/seiga.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_99 = "/touhou-translations/assets/static/seiga.etA_P-3s.webp";
/*! src/icons/characters/portraits/seija.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_100 = "/touhou-translations/assets/static/seija.2WIQ5me-.webp";
/*! src/icons/characters/portraits/seiran.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_101 = "/touhou-translations/assets/static/seiran.PrMklpOC.webp";
/*! src/icons/characters/portraits/sekibanki.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_102 = "/touhou-translations/assets/static/sekibanki.CtsD4rzS.webp";
/*! src/icons/characters/portraits/shinmyoumaru.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_103 = "/touhou-translations/assets/static/shinmyoumaru.C7Ey8QIS.webp";
/*! src/icons/characters/portraits/shion.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_104 = "/touhou-translations/assets/static/shion.CCicYzB4.webp";
/*! src/icons/characters/portraits/shizuha.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_105 = "/touhou-translations/assets/static/shizuha.A7VrV-Bc.webp";
/*! src/icons/characters/portraits/shou.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_106 = "/touhou-translations/assets/static/shou.BEsfrLOt.webp";
/*! src/icons/characters/portraits/star.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_107 = "/touhou-translations/assets/static/star.wYNQTgl8.webp";
/*! src/icons/characters/portraits/suika.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_108 = "/touhou-translations/assets/static/suika.CRhTDXE1.webp";
/*! src/icons/characters/portraits/sumireko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_109 = "/touhou-translations/assets/static/sumireko.BK1zWfmI.webp";
/*! src/icons/characters/portraits/sunny.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_110 = "/touhou-translations/assets/static/sunny.BtNRRNhC.webp";
/*! src/icons/characters/portraits/suwako.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_111 = "/touhou-translations/assets/static/suwako.DdFZEDfi.webp";
/*! src/icons/characters/portraits/takane.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_112 = "/touhou-translations/assets/static/takane.CwL4AyIL.webp";
/*! src/icons/characters/portraits/tenshi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_113 = "/touhou-translations/assets/static/tenshi.DMOOpmJj.webp";
/*! src/icons/characters/portraits/tewi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_114 = "/touhou-translations/assets/static/tewi.BZYWcSHr.webp";
/*! src/icons/characters/portraits/tojiko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_115 = "/touhou-translations/assets/static/tojiko.CvrNXy8n.webp";
/*! src/icons/characters/portraits/tokiko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_116 = "/touhou-translations/assets/static/tokiko.94LDDDuY.webp";
/*! src/icons/characters/portraits/toyohime.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_117 = "/touhou-translations/assets/static/toyohime.QKIaJFeT.webp";
/*! src/icons/characters/portraits/tsukasa.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_118 = "/touhou-translations/assets/static/tsukasa.CyNrcHuq.webp";
/*! src/icons/characters/portraits/ubame.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_119 = "/touhou-translations/assets/static/ubame.voz_v1y3.webp";
/*! src/icons/characters/portraits/urumi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_120 = "/touhou-translations/assets/static/urumi.Df6Cciq-.webp";
/*! src/icons/characters/portraits/wakasagihime.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_121 = "/touhou-translations/assets/static/wakasagihime.D_0LByx1.webp";
/*! src/icons/characters/portraits/wriggle.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_122 = "/touhou-translations/assets/static/wriggle.CGbzpf9d.webp";
/*! src/icons/characters/portraits/yachie.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_123 = "/touhou-translations/assets/static/yachie.DLcZDIec.webp";
/*! src/icons/characters/portraits/yamame.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_124 = "/touhou-translations/assets/static/yamame.Cowv3hzP.webp";
/*! src/icons/characters/portraits/yatsuhashi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_125 = "/touhou-translations/assets/static/yatsuhashi.8JlpmpvI.webp";
/*! src/icons/characters/portraits/yorihime.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_126 = "/touhou-translations/assets/static/yorihime.bE-u9OYh.webp";
/*! src/icons/characters/portraits/yoshika.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_127 = "/touhou-translations/assets/static/yoshika.Bu9xJYaF.webp";
/*! src/icons/characters/portraits/youmu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_128 = "/touhou-translations/assets/static/youmu.BraMTuz2.webp";
/*! src/icons/characters/portraits/yukari.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_129 = "/touhou-translations/assets/static/yukari.DFM8Y7yz.webp";
/*! src/icons/characters/portraits/yuugi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_130 = "/touhou-translations/assets/static/yuugi.Dz7rI4zj.webp";
/*! src/icons/characters/portraits/yuuka.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_131 = "/touhou-translations/assets/static/yuuka.DA8sJLqI.webp";
/*! src/icons/characters/portraits/yuuma.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_132 = "/touhou-translations/assets/static/yuuma.Cv7XgboV.webp";
/*! src/icons/characters/portraits/yuyuko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_133 = "/touhou-translations/assets/static/yuyuko.DB3S438q.webp";
/*! src/icons/characters/portraits/zanmu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_0_134 = "/touhou-translations/assets/static/zanmu.ErIc0Xhp.webp";
/*! src/icons/artists/arugon.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_0 = "/touhou-translations/assets/static/arugon.BZXWETkG.webp";
/*! src/icons/artists/ayaharu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_1 = "/touhou-translations/assets/static/ayaharu.C_YX6P8J.webp";
/*! src/icons/artists/chitose_hachi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_2 = "/touhou-translations/assets/static/chitose_hachi.DakvuEU-.webp";
/*! src/icons/artists/chuumukade.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_3 = "/touhou-translations/assets/static/chuumukade.BO6pqu2w.webp";
/*! src/icons/artists/deetamu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_4 = "/touhou-translations/assets/static/deetamu.D5LMepzq.webp";
/*! src/icons/artists/ebi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_5 = "/touhou-translations/assets/static/ebi.BL-Zodck.webp";
/*! src/icons/artists/enoki.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_6 = "/touhou-translations/assets/static/enoki.l8teeIP1.webp";
/*! src/icons/artists/gohan_tabe.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_7 = "/touhou-translations/assets/static/gohan_tabe.YIJJn6N0.webp";
/*! src/icons/artists/gokuu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_8 = "/touhou-translations/assets/static/gokuu.DmR8mxfw.webp";
/*! src/icons/artists/haruwaka_noroshi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_9 = "/touhou-translations/assets/static/haruwaka_noroshi.z5BOxbKl.webp";
/*! src/icons/artists/hidaruma.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_10 = "/touhou-translations/assets/static/hidaruma.CDieD8l3.webp";
/*! src/icons/artists/iroiro_yaru_hito.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_11 = "/touhou-translations/assets/static/iroiro_yaru_hito.BgfYnGPU.webp";
/*! src/icons/artists/kanonari.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_12 = "/touhou-translations/assets/static/kanonari.6i_QpXmA.webp";
/*! src/icons/artists/kanpa.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_13 = "/touhou-translations/assets/static/kanpa.BIus6scQ.webp";
/*! src/icons/artists/konna_reshiki.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_14 = "/touhou-translations/assets/static/konna_reshiki.BqEmPioX.webp";
/*! src/icons/artists/mendou15.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_15 = "/touhou-translations/assets/static/mendou15.Snb17Fri.webp";
/*! src/icons/artists/merihari.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_16 = "/touhou-translations/assets/static/merihari.DsXB5BU_.webp";
/*! src/icons/artists/muntarou.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_17 = "/touhou-translations/assets/static/muntarou.D0Bncsb5.webp";
/*! src/icons/artists/purabird.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_18 = "/touhou-translations/assets/static/purabird.BxWzhIXd.webp";
/*! src/icons/artists/seele.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_19 = "/touhou-translations/assets/static/seele.12r5Rb37.webp";
/*! src/icons/artists/sha_re.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_20 = "data:image/webp;base64,UklGRvYAAABXRUJQVlA4IOoAAACwFgCdASosASwBPoFAnUulI6KhoCgAoBAJaW7hd2EbQArN2vFych77ZOSkw99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIesQAAP7/1BT//+xfytfytUv/87VsfYGZ4ON2QKsCMrvwIAAAAAAAAAAMWAoAAAA=";
/*! src/icons/artists/shichimi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_21 = "/touhou-translations/assets/static/shichimi.BEJoBzK2.webp";
/*! src/icons/artists/shio.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_22 = "/touhou-translations/assets/static/shio.DAh3pSoB.webp";
/*! src/icons/artists/sniper.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_23 = "/touhou-translations/assets/static/sniper.C4ZO9mbk.webp";
/*! src/icons/artists/sobayu_to_tempura.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_24 = "/touhou-translations/assets/static/sobayu_to_tempura.BxTHbLUt.webp";
/*! src/icons/artists/soborou.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_25 = "/touhou-translations/assets/static/soborou.BuUmluBH.webp";
/*! src/icons/artists/solidus.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_26 = "/touhou-translations/assets/static/solidus.D-w1GKXh.webp";
/*! src/icons/artists/soregashi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_27 = "/touhou-translations/assets/static/soregashi.2IzVtBfk.webp";
/*! src/icons/artists/suwaneko.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_28 = "/touhou-translations/assets/static/suwaneko.DVD406iN.webp";
/*! src/icons/artists/suzume_suzume.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_29 = "/touhou-translations/assets/static/suzume_suzume.BryVqyp4.webp";
/*! src/icons/artists/teoi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_30 = "/touhou-translations/assets/static/teoi.inRbYC3W.webp";
/*! src/icons/artists/tofuya.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_31 = "/touhou-translations/assets/static/tofuya.Bmh_2rFa.webp";
/*! src/icons/artists/yimu.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_32 = "/touhou-translations/assets/static/yimu.DOWSRnn_.webp";
/*! src/icons/artists/youyume.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_33 = "/touhou-translations/assets/static/youyume.BemFfIf-.webp";
/*! src/icons/artists/yukiya_nagi.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_34 = "/touhou-translations/assets/static/yukiya_nagi.GMn4l1jQ.webp";
/*! src/icons/artists/zounose.webp?url [vike:pluginModuleBanner] */
const __vite_glob_1_35 = "/touhou-translations/assets/static/zounose.CPmPufiI.webp";
/*! src/icons/placeholders/demoman.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_0 = "/touhou-translations/assets/static/demoman.DKVe_qV0.webp";
/*! src/icons/placeholders/engineer.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_1 = "/touhou-translations/assets/static/engineer.nXZlyKzP.webp";
/*! src/icons/placeholders/heavy.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_2 = "/touhou-translations/assets/static/heavy.B3TiiyhY.webp";
/*! src/icons/placeholders/medic.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_3 = "/touhou-translations/assets/static/medic.Dt21nUYq.webp";
/*! src/icons/placeholders/pyro.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_4 = "/touhou-translations/assets/static/pyro.BbzNqIpv.webp";
/*! src/icons/placeholders/scout.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_5 = "/touhou-translations/assets/static/scout.CGrWOvBY.webp";
/*! src/icons/placeholders/sniper.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_6 = "/touhou-translations/assets/static/sniper.DMrGlNqT.webp";
/*! src/icons/placeholders/soldier.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_7 = "/touhou-translations/assets/static/soldier.DOxzU5rm.webp";
/*! src/icons/placeholders/spy.webp?url [vike:pluginModuleBanner] */
const __vite_glob_2_8 = "/touhou-translations/assets/static/spy.YJksyo1j.webp";
/*! src/utils/galleryUtils.ts [vike:pluginModuleBanner] */
const characterPortraits = /* @__PURE__ */ Object.assign({
  "../icons/characters/portraits/akyuu.webp": __vite_glob_0_0,
  "../icons/characters/portraits/alice.webp": __vite_glob_0_1,
  "../icons/characters/portraits/aun.webp": __vite_glob_0_2,
  "../icons/characters/portraits/aya.webp": __vite_glob_0_3,
  "../icons/characters/portraits/benben.webp": __vite_glob_0_4,
  "../icons/characters/portraits/biten.webp": __vite_glob_0_5,
  "../icons/characters/portraits/byakuren.webp": __vite_glob_0_6,
  "../icons/characters/portraits/chen.webp": __vite_glob_0_7,
  "../icons/characters/portraits/chimata.webp": __vite_glob_0_8,
  "../icons/characters/portraits/chimi.webp": __vite_glob_0_9,
  "../icons/characters/portraits/chiyari.webp": __vite_glob_0_10,
  "../icons/characters/portraits/cirno.webp": __vite_glob_0_11,
  "../icons/characters/portraits/clownpiece.webp": __vite_glob_0_12,
  "../icons/characters/portraits/daiyousei.webp": __vite_glob_0_13,
  "../icons/characters/portraits/doremy.webp": __vite_glob_0_14,
  "../icons/characters/portraits/eika.webp": __vite_glob_0_15,
  "../icons/characters/portraits/eiki.webp": __vite_glob_0_16,
  "../icons/characters/portraits/eirin.webp": __vite_glob_0_17,
  "../icons/characters/portraits/enoko.webp": __vite_glob_0_18,
  "../icons/characters/portraits/flandre.webp": __vite_glob_0_19,
  "../icons/characters/portraits/futo.webp": __vite_glob_0_20,
  "../icons/characters/portraits/hatate.webp": __vite_glob_0_21,
  "../icons/characters/portraits/hecatia.webp": __vite_glob_0_22,
  "../icons/characters/portraits/hina.webp": __vite_glob_0_23,
  "../icons/characters/portraits/hisami.webp": __vite_glob_0_24,
  "../icons/characters/portraits/ichirin.webp": __vite_glob_0_25,
  "../icons/characters/portraits/iku.webp": __vite_glob_0_26,
  "../icons/characters/portraits/joon.webp": __vite_glob_0_27,
  "../icons/characters/portraits/junko.webp": __vite_glob_0_28,
  "../icons/characters/portraits/kagerou.webp": __vite_glob_0_29,
  "../icons/characters/portraits/kaguya.webp": __vite_glob_0_30,
  "../icons/characters/portraits/kanako.webp": __vite_glob_0_31,
  "../icons/characters/portraits/kasen.webp": __vite_glob_0_32,
  "../icons/characters/portraits/keiki.webp": __vite_glob_0_33,
  "../icons/characters/portraits/keine.webp": __vite_glob_0_34,
  "../icons/characters/portraits/kisume.webp": __vite_glob_0_35,
  "../icons/characters/portraits/koakuma.webp": __vite_glob_0_36,
  "../icons/characters/portraits/kogasa.webp": __vite_glob_0_37,
  "../icons/characters/portraits/koishi.webp": __vite_glob_0_38,
  "../icons/characters/portraits/kokoro.webp": __vite_glob_0_39,
  "../icons/characters/portraits/komachi.webp": __vite_glob_0_40,
  "../icons/characters/portraits/kosuzu.webp": __vite_glob_0_41,
  "../icons/characters/portraits/kutaka.webp": __vite_glob_0_42,
  "../icons/characters/portraits/kyouko.webp": __vite_glob_0_43,
  "../icons/characters/portraits/larva.webp": __vite_glob_0_44,
  "../icons/characters/portraits/letty.webp": __vite_glob_0_45,
  "../icons/characters/portraits/lily.webp": __vite_glob_0_46,
  "../icons/characters/portraits/luna.webp": __vite_glob_0_47,
  "../icons/characters/portraits/lunasa.webp": __vite_glob_0_48,
  "../icons/characters/portraits/lyrica.webp": __vite_glob_0_49,
  "../icons/characters/portraits/mai.webp": __vite_glob_0_50,
  "../icons/characters/portraits/mamizou.webp": __vite_glob_0_51,
  "../icons/characters/portraits/marisa.webp": __vite_glob_0_52,
  "../icons/characters/portraits/mayumi.webp": __vite_glob_0_53,
  "../icons/characters/portraits/medicine.webp": __vite_glob_0_54,
  "../icons/characters/portraits/megumu.webp": __vite_glob_0_55,
  "../icons/characters/portraits/meiling.webp": __vite_glob_0_56,
  "../icons/characters/portraits/merlin.webp": __vite_glob_0_57,
  "../icons/characters/portraits/merry.webp": __vite_glob_0_58,
  "../icons/characters/portraits/mike.webp": __vite_glob_0_59,
  "../icons/characters/portraits/miko.webp": __vite_glob_0_60,
  "../icons/characters/portraits/minamitsu.webp": __vite_glob_0_61,
  "../icons/characters/portraits/minoriko.webp": __vite_glob_0_62,
  "../icons/characters/portraits/misumaru.webp": __vite_glob_0_63,
  "../icons/characters/portraits/miyoi.webp": __vite_glob_0_64,
  "../icons/characters/portraits/mizuchi.webp": __vite_glob_0_65,
  "../icons/characters/portraits/mokou.webp": __vite_glob_0_66,
  "../icons/characters/portraits/momiji.webp": __vite_glob_0_67,
  "../icons/characters/portraits/momoyo.webp": __vite_glob_0_68,
  "../icons/characters/portraits/mystia.webp": __vite_glob_0_69,
  "../icons/characters/portraits/nareko.webp": __vite_glob_0_70,
  "../icons/characters/portraits/narumi.webp": __vite_glob_0_71,
  "../icons/characters/portraits/nazrin.webp": __vite_glob_0_72,
  "../icons/characters/portraits/nemuno.webp": __vite_glob_0_73,
  "../icons/characters/portraits/nitori.webp": __vite_glob_0_74,
  "../icons/characters/portraits/nue.webp": __vite_glob_0_75,
  "../icons/characters/portraits/okina.webp": __vite_glob_0_76,
  "../icons/characters/portraits/okuu.webp": __vite_glob_0_77,
  "../icons/characters/portraits/orin.webp": __vite_glob_0_78,
  "../icons/characters/portraits/parsee.webp": __vite_glob_0_79,
  "../icons/characters/portraits/patchouli.webp": __vite_glob_0_80,
  "../icons/characters/portraits/raiko.webp": __vite_glob_0_81,
  "../icons/characters/portraits/ran.webp": __vite_glob_0_82,
  "../icons/characters/portraits/reimu.webp": __vite_glob_0_83,
  "../icons/characters/portraits/reisen.webp": __vite_glob_0_84,
  "../icons/characters/portraits/reisen2.webp": __vite_glob_0_85,
  "../icons/characters/portraits/remilia.webp": __vite_glob_0_86,
  "../icons/characters/portraits/renko.webp": __vite_glob_0_87,
  "../icons/characters/portraits/rin.webp": __vite_glob_0_88,
  "../icons/characters/portraits/ringo.webp": __vite_glob_0_89,
  "../icons/characters/portraits/rinnosuke.webp": __vite_glob_0_90,
  "../icons/characters/portraits/rumia.webp": __vite_glob_0_91,
  "../icons/characters/portraits/sagume.webp": __vite_glob_0_92,
  "../icons/characters/portraits/saki.webp": __vite_glob_0_93,
  "../icons/characters/portraits/sakuya.webp": __vite_glob_0_94,
  "../icons/characters/portraits/sanae.webp": __vite_glob_0_95,
  "../icons/characters/portraits/sannyo.webp": __vite_glob_0_96,
  "../icons/characters/portraits/satono.webp": __vite_glob_0_97,
  "../icons/characters/portraits/satori.webp": __vite_glob_0_98,
  "../icons/characters/portraits/seiga.webp": __vite_glob_0_99,
  "../icons/characters/portraits/seija.webp": __vite_glob_0_100,
  "../icons/characters/portraits/seiran.webp": __vite_glob_0_101,
  "../icons/characters/portraits/sekibanki.webp": __vite_glob_0_102,
  "../icons/characters/portraits/shinmyoumaru.webp": __vite_glob_0_103,
  "../icons/characters/portraits/shion.webp": __vite_glob_0_104,
  "../icons/characters/portraits/shizuha.webp": __vite_glob_0_105,
  "../icons/characters/portraits/shou.webp": __vite_glob_0_106,
  "../icons/characters/portraits/star.webp": __vite_glob_0_107,
  "../icons/characters/portraits/suika.webp": __vite_glob_0_108,
  "../icons/characters/portraits/sumireko.webp": __vite_glob_0_109,
  "../icons/characters/portraits/sunny.webp": __vite_glob_0_110,
  "../icons/characters/portraits/suwako.webp": __vite_glob_0_111,
  "../icons/characters/portraits/takane.webp": __vite_glob_0_112,
  "../icons/characters/portraits/tenshi.webp": __vite_glob_0_113,
  "../icons/characters/portraits/tewi.webp": __vite_glob_0_114,
  "../icons/characters/portraits/tojiko.webp": __vite_glob_0_115,
  "../icons/characters/portraits/tokiko.webp": __vite_glob_0_116,
  "../icons/characters/portraits/toyohime.webp": __vite_glob_0_117,
  "../icons/characters/portraits/tsukasa.webp": __vite_glob_0_118,
  "../icons/characters/portraits/ubame.webp": __vite_glob_0_119,
  "../icons/characters/portraits/urumi.webp": __vite_glob_0_120,
  "../icons/characters/portraits/wakasagihime.webp": __vite_glob_0_121,
  "../icons/characters/portraits/wriggle.webp": __vite_glob_0_122,
  "../icons/characters/portraits/yachie.webp": __vite_glob_0_123,
  "../icons/characters/portraits/yamame.webp": __vite_glob_0_124,
  "../icons/characters/portraits/yatsuhashi.webp": __vite_glob_0_125,
  "../icons/characters/portraits/yorihime.webp": __vite_glob_0_126,
  "../icons/characters/portraits/yoshika.webp": __vite_glob_0_127,
  "../icons/characters/portraits/youmu.webp": __vite_glob_0_128,
  "../icons/characters/portraits/yukari.webp": __vite_glob_0_129,
  "../icons/characters/portraits/yuugi.webp": __vite_glob_0_130,
  "../icons/characters/portraits/yuuka.webp": __vite_glob_0_131,
  "../icons/characters/portraits/yuuma.webp": __vite_glob_0_132,
  "../icons/characters/portraits/yuyuko.webp": __vite_glob_0_133,
  "../icons/characters/portraits/zanmu.webp": __vite_glob_0_134
});
const artistPortraits = /* @__PURE__ */ Object.assign({
  "../icons/artists/arugon.webp": __vite_glob_1_0,
  "../icons/artists/ayaharu.webp": __vite_glob_1_1,
  "../icons/artists/chitose_hachi.webp": __vite_glob_1_2,
  "../icons/artists/chuumukade.webp": __vite_glob_1_3,
  "../icons/artists/deetamu.webp": __vite_glob_1_4,
  "../icons/artists/ebi.webp": __vite_glob_1_5,
  "../icons/artists/enoki.webp": __vite_glob_1_6,
  "../icons/artists/gohan_tabe.webp": __vite_glob_1_7,
  "../icons/artists/gokuu.webp": __vite_glob_1_8,
  "../icons/artists/haruwaka_noroshi.webp": __vite_glob_1_9,
  "../icons/artists/hidaruma.webp": __vite_glob_1_10,
  "../icons/artists/iroiro_yaru_hito.webp": __vite_glob_1_11,
  "../icons/artists/kanonari.webp": __vite_glob_1_12,
  "../icons/artists/kanpa.webp": __vite_glob_1_13,
  "../icons/artists/konna_reshiki.webp": __vite_glob_1_14,
  "../icons/artists/mendou15.webp": __vite_glob_1_15,
  "../icons/artists/merihari.webp": __vite_glob_1_16,
  "../icons/artists/muntarou.webp": __vite_glob_1_17,
  "../icons/artists/purabird.webp": __vite_glob_1_18,
  "../icons/artists/seele.webp": __vite_glob_1_19,
  "../icons/artists/sha_re.webp": __vite_glob_1_20,
  "../icons/artists/shichimi.webp": __vite_glob_1_21,
  "../icons/artists/shio.webp": __vite_glob_1_22,
  "../icons/artists/sniper.webp": __vite_glob_1_23,
  "../icons/artists/sobayu_to_tempura.webp": __vite_glob_1_24,
  "../icons/artists/soborou.webp": __vite_glob_1_25,
  "../icons/artists/solidus.webp": __vite_glob_1_26,
  "../icons/artists/soregashi.webp": __vite_glob_1_27,
  "../icons/artists/suwaneko.webp": __vite_glob_1_28,
  "../icons/artists/suzume_suzume.webp": __vite_glob_1_29,
  "../icons/artists/teoi.webp": __vite_glob_1_30,
  "../icons/artists/tofuya.webp": __vite_glob_1_31,
  "../icons/artists/yimu.webp": __vite_glob_1_32,
  "../icons/artists/youyume.webp": __vite_glob_1_33,
  "../icons/artists/yukiya_nagi.webp": __vite_glob_1_34,
  "../icons/artists/zounose.webp": __vite_glob_1_35
});
const placeholderImages = /* @__PURE__ */ Object.assign({
  "../icons/placeholders/demoman.webp": __vite_glob_2_0,
  "../icons/placeholders/engineer.webp": __vite_glob_2_1,
  "../icons/placeholders/heavy.webp": __vite_glob_2_2,
  "../icons/placeholders/medic.webp": __vite_glob_2_3,
  "../icons/placeholders/pyro.webp": __vite_glob_2_4,
  "../icons/placeholders/scout.webp": __vite_glob_2_5,
  "../icons/placeholders/sniper.webp": __vite_glob_2_6,
  "../icons/placeholders/soldier.webp": __vite_glob_2_7,
  "../icons/placeholders/spy.webp": __vite_glob_2_8
});
const getCharacterPortraits = (id) => {
  const path = `../icons/characters/portraits/${id}.webp`;
  if (path in characterPortraits) return characterPortraits[path];
  const placeholders = Object.values(placeholderImages);
  return placeholders.length ? placeholders[Math.floor(Math.random() * placeholders.length)] : null;
};
const getArtistPortraits = (id) => {
  const path = `../icons/artists/${id}.webp`;
  if (path in artistPortraits) return artistPortraits[path];
  const placeholders = Object.values(placeholderImages);
  return placeholders.length ? placeholders[Math.floor(Math.random() * placeholders.length)] : null;
};
/*! src/components/ProfileItem/ProfileItem.styles.ts [vike:pluginModuleBanner] */
const styles = {
  paper: {
    p: 2,
    borderRadius: 2,
    transition: "all 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      bgcolor: "#f9f9f9",
      boxShadow: 3,
      transform: "translateY(-2px)"
    }
  },
  linkBox: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    width: "100%"
  },
  textContainer: {
    flexGrow: 1
  },
  avatar: {
    width: 80,
    height: 80,
    flexShrink: 0
  },
  placeholder: {
    width: 80,
    height: 80,
    bgcolor: "#f0f0f0",
    borderRadius: 2,
    flexShrink: 0
  }
};
/*! src/components/ProfileItem/ProfileItem.tsx [vike:pluginModuleBanner] */
const ProfileItem = ({ name, imageUrl, description, link }) => {
  const ImageContent = imageUrl ? /* @__PURE__ */ jsx(Avatar, { src: imageUrl, alt: name, sx: styles.avatar, variant: "rounded", slotProps: { img: { loading: "lazy" } } }) : /* @__PURE__ */ jsx(Box, { sx: styles.placeholder, "aria-hidden": true });
  const handleClick = () => {
    if (link) navigate(link);
  };
  const handleKeyDown = (event) => {
    if ((event.key === "Enter" || event.key === " ") && link) {
      event.preventDefault();
      navigate(link);
    }
  };
  const Content = /* @__PURE__ */ jsxs(Box, { sx: styles.content, children: [
    ImageContent,
    /* @__PURE__ */ jsxs(Box, { sx: styles.textContainer, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", fontWeight: 600, children: name }),
      description && /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: description })
    ] })
  ] });
  return /* @__PURE__ */ jsx(Paper, { component: "li", elevation: 1, role: "listitem", "aria-label": `Profile: ${name}`, tabIndex: link ? void 0 : 0, sx: styles.paper, children: link ? /* @__PURE__ */ jsx(Box, { onClick: handleClick, onKeyDown: handleKeyDown, sx: { ...styles.linkBox, cursor: "pointer" }, role: "button", tabIndex: 0, children: Content }) : /* @__PURE__ */ jsx(Box, { sx: styles.linkBox, children: Content }) });
};
export {
  ProfileItem as P,
  getArtistPortraits as a,
  getCharacterPortraits as g
};
