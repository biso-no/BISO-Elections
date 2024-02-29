type Theme = {
  color: string;
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color05: string;
  color10: string;
  color11: string;
  color12: string;
  color025: string;
  color075: string;
  background: string;
  colorFocus: string;
  colorHover: string;
  colorPress: string;
  accentColor: string;
  background0: string;
  borderColor: string;
  background05: string;
  background025: string;
  background075: string;
  backgroundFocus: string;
  backgroundHover: string;
  backgroundPress: string;
  accentBackground: string;
  borderColorFocus: string;
  borderColorHover: string;
  borderColorPress: string;
  placeholderColor: string;

}

function t(a: [number, number][]) {
  let res: Record<string,string> = {}
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string
  }
  return res as Theme
}
const vs = [
  'hsla(100, 0%, 15%, 1)',
  'hsla(100, 0%, 10%, 1)',
  'hsla(100, 0%, 99%, 1)',
  'hsla(100, 0%, 93%, 1)',
  'hsla(100, 0%, 88%, 1)',
  'hsla(100, 0%, 82%, 1)',
  'hsla(100, 0%, 77%, 1)',
  'hsla(100, 0%, 72%, 1)',
  'hsla(100, 0%, 66%, 1)',
  'hsla(100, 0%, 61%, 1)',
  'hsla(100, 0%, 55%, 1)',
  'hsla(0, 0%, 10%, 0.5)',
  'hsla(100, 0%, 50%, 1)',
  'hsla(0, 0%, 10%, 0.75)',
  'hsla(0, 0%, 10%, 0.25)',
  'hsla(200, 75%, 95%, 1)',
  'hsla(0, 0%, 99%, 0.25)',
  'hsla(0, 0%, 99%, 0.75)',
  'hsla(0, 0%, 99%, 0.5)',
  'hsla(200, 75%, 40%, 1)',
  'hsla(100, 0%, 95%, 1)',
  'hsla(100, 0%, 14%, 1)',
  'hsla(100, 0%, 19%, 1)',
  'hsla(100, 0%, 23%, 1)',
  'hsla(100, 0%, 28%, 1)',
  'hsla(100, 0%, 32%, 1)',
  'hsla(100, 0%, 37%, 1)',
  'hsla(100, 0%, 41%, 1)',
  'hsla(100, 0%, 46%, 1)',
  'hsla(0, 0%, 95%, 0.5)',
  'hsla(0, 0%, 95%, 0.75)',
  'hsla(0, 0%, 95%, 0.25)',
  'hsla(200, 75%, 35%, 1)',
  'hsla(0, 70%, 15%, 1)',
  'hsla(0, 70%, 10%, 1)',
  'hsla(0, 70%, 99%, 1)',
  'hsla(0, 70%, 93%, 1)',
  'hsla(0, 70%, 88%, 1)',
  'hsla(0, 70%, 82%, 1)',
  'hsla(0, 70%, 77%, 1)',
  'hsla(0, 70%, 72%, 1)',
  'hsla(0, 70%, 66%, 1)',
  'hsla(0, 70%, 61%, 1)',
  'hsla(0, 70%, 55%, 1)',
  'hsla(0, 69%, 10%, 0.5)',
  'hsla(0, 70%, 50%, 1)',
  'hsla(0, 69%, 10%, 0.75)',
  'hsla(0, 69%, 10%, 0.25)',
  'hsla(0, 60%, 99%, 0.25)',
  'hsla(0, 60%, 99%, 0.75)',
  'hsla(0, 60%, 99%, 0.5)',
  'hsla(48, 70%, 15%, 1)',
  'hsla(48, 70%, 10%, 1)',
  'hsla(48, 70%, 99%, 1)',
  'hsla(48, 70%, 93%, 1)',
  'hsla(48, 70%, 88%, 1)',
  'hsla(48, 70%, 82%, 1)',
  'hsla(48, 70%, 77%, 1)',
  'hsla(48, 70%, 72%, 1)',
  'hsla(48, 70%, 66%, 1)',
  'hsla(48, 70%, 61%, 1)',
  'hsla(48, 70%, 55%, 1)',
  'hsla(48, 69%, 10%, 0.5)',
  'hsla(48, 70%, 50%, 1)',
  'hsla(48, 69%, 10%, 0.75)',
  'hsla(48, 69%, 10%, 0.25)',
  'hsla(60, 60%, 99%, 0.25)',
  'hsla(60, 60%, 99%, 0.75)',
  'hsla(60, 60%, 99%, 0.5)',
  'hsla(153, 70%, 15%, 1)',
  'hsla(153, 70%, 10%, 1)',
  'hsla(153, 70%, 99%, 1)',
  'hsla(153, 70%, 93%, 1)',
  'hsla(153, 70%, 88%, 1)',
  'hsla(153, 70%, 82%, 1)',
  'hsla(153, 70%, 77%, 1)',
  'hsla(153, 70%, 72%, 1)',
  'hsla(153, 70%, 66%, 1)',
  'hsla(153, 70%, 61%, 1)',
  'hsla(153, 70%, 55%, 1)',
  'hsla(153, 69%, 10%, 0.5)',
  'hsla(153, 70%, 50%, 1)',
  'hsla(153, 69%, 10%, 0.75)',
  'hsla(153, 69%, 10%, 0.25)',
  'hsla(160, 60%, 99%, 0.25)',
  'hsla(160, 60%, 99%, 0.75)',
  'hsla(160, 60%, 99%, 0.5)',
  'hsla(0, 70%, 95%, 1)',
  'hsla(0, 70%, 14%, 1)',
  'hsla(0, 70%, 19%, 1)',
  'hsla(0, 70%, 23%, 1)',
  'hsla(0, 70%, 28%, 1)',
  'hsla(0, 70%, 32%, 1)',
  'hsla(0, 70%, 37%, 1)',
  'hsla(0, 70%, 41%, 1)',
  'hsla(0, 70%, 46%, 1)',
  'hsla(0, 69%, 95%, 0.5)',
  'hsla(0, 69%, 95%, 0.75)',
  'hsla(0, 69%, 95%, 0.25)',
  'hsla(48, 70%, 95%, 1)',
  'hsla(48, 70%, 14%, 1)',
  'hsla(48, 70%, 19%, 1)',
  'hsla(48, 70%, 23%, 1)',
  'hsla(48, 70%, 28%, 1)',
  'hsla(48, 70%, 32%, 1)',
  'hsla(48, 70%, 37%, 1)',
  'hsla(48, 70%, 41%, 1)',
  'hsla(48, 70%, 46%, 1)',
  'hsla(50, 69%, 95%, 0.5)',
  'hsla(50, 69%, 95%, 0.75)',
  'hsla(50, 69%, 95%, 0.25)',
  'hsla(153, 70%, 95%, 1)',
  'hsla(153, 70%, 14%, 1)',
  'hsla(153, 70%, 19%, 1)',
  'hsla(153, 70%, 23%, 1)',
  'hsla(153, 70%, 28%, 1)',
  'hsla(153, 70%, 32%, 1)',
  'hsla(153, 70%, 37%, 1)',
  'hsla(153, 70%, 41%, 1)',
  'hsla(153, 70%, 46%, 1)',
  'hsla(153, 69%, 95%, 0.5)',
  'hsla(153, 69%, 95%, 0.75)',
  'hsla(153, 69%, 95%, 0.25)',
  'hsla(200, 75%, 42%, 1)',
  'hsla(200, 75%, 43%, 1)',
  'hsla(200, 75%, 45%, 1)',
  'hsla(200, 75%, 47%, 1)',
  'hsla(200, 75%, 48%, 1)',
  'hsla(200, 75%, 50%, 1)',
  'hsla(200, 75%, 52%, 1)',
  'hsla(200, 75%, 53%, 1)',
  'hsla(202, 76%, 95%, 0.5)',
  'hsla(200, 75%, 55%, 1)',
  'hsla(202, 76%, 95%, 0.75)',
  'hsla(202, 76%, 95%, 0.25)',
  'hsla(200, 75%, 40%, 0.25)',
  'hsla(200, 75%, 40%, 0.75)',
  'hsla(200, 75%, 40%, 0.5)',
  'hsla(200, 75%, 90%, 1)',
  'hsla(200, 75%, 37%, 1)',
  'hsla(200, 75%, 38%, 1)',
  'hsla(200, 75%, 35%, 0.25)',
  'hsla(200, 75%, 35%, 0.75)',
  'hsla(200, 75%, 35%, 0.5)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.9)',
  'hsla(0, 0%, 10%, 0)',
  'hsla(0, 0%, 99%, 0)',
  'hsla(0, 0%, 95%, 0)',
  'hsla(0, 60%, 99%, 0)',
  'hsla(60, 60%, 99%, 0)',
  'hsla(160, 60%, 99%, 0)',
  'hsla(0, 69%, 10%, 0)',
  'hsla(48, 69%, 10%, 0)',
  'hsla(153, 69%, 10%, 0)',
  'hsla(200, 75%, 40%, 0)',
  'hsla(200, 75%, 35%, 0)',
]

const ks = [
'color',
'color0',
'color1',
'color2',
'color3',
'color4',
'color5',
'color6',
'color7',
'color8',
'color9',
'color05',
'color10',
'color11',
'color12',
'color025',
'color075',
'background',
'colorFocus',
'colorHover',
'colorPress',
'accentColor',
'background0',
'borderColor',
'background05',
'background025',
'background075',
'backgroundFocus',
'backgroundHover',
'backgroundPress',
'accentBackground',
'borderColorFocus',
'borderColorHover',
'borderColorPress',
'placeholderColor']


const n1 = t([[0, 0],[1, 1],[2, 2],[3, 3],[4, 4],[5, 5],[6, 6],[7, 7],[8, 8],[9, 9],[10, 10],[11, 11],[12, 12],[13, 0],[14, 1],[15, 13],[16, 14],[17, 2],[18, 12],[19, 12],[20, 0],[21, 15],[22, 16],[23, 5],[24, 17],[25, 18],[26, 2],[27, 5],[28, 3],[29, 4],[30, 19],[31, 7],[32, 6],[33, 6],[34, 12]])

export const light = n1
const n2 = t([[0, 3],[1, 20],[2, 1],[3, 21],[4, 22],[5, 23],[6, 24],[7, 25],[8, 26],[9, 27],[10, 28],[11, 29],[12, 12],[13, 3],[14, 20],[15, 30],[16, 31],[17, 1],[18, 12],[19, 12],[20, 3],[21, 15],[22, 14],[23, 23],[24, 13],[25, 11],[26, 1],[27, 23],[28, 21],[29, 22],[30, 32],[31, 25],[32, 24],[33, 24],[34, 12]])

export const dark = n2
const n3 = t([[0, 33],[1, 34],[2, 35],[3, 36],[4, 37],[5, 38],[6, 39],[7, 40],[8, 41],[9, 42],[10, 43],[11, 44],[12, 45],[13, 33],[14, 34],[15, 46],[16, 47],[17, 35],[18, 45],[19, 45],[20, 33],[21, 15],[22, 48],[23, 38],[24, 49],[25, 50],[26, 35],[27, 38],[28, 36],[29, 37],[30, 19],[31, 40],[32, 39],[33, 39],[34, 45]])

export const light_error = n3
const n4 = t([[0, 51],[1, 52],[2, 53],[3, 54],[4, 55],[5, 56],[6, 57],[7, 58],[8, 59],[9, 60],[10, 61],[11, 62],[12, 63],[13, 51],[14, 52],[15, 64],[16, 65],[17, 53],[18, 63],[19, 63],[20, 51],[21, 15],[22, 66],[23, 56],[24, 67],[25, 68],[26, 53],[27, 56],[28, 54],[29, 55],[30, 19],[31, 58],[32, 57],[33, 57],[34, 63]])

export const light_warning = n4
const n5 = t([[0, 69],[1, 70],[2, 71],[3, 72],[4, 73],[5, 74],[6, 75],[7, 76],[8, 77],[9, 78],[10, 79],[11, 80],[12, 81],[13, 69],[14, 70],[15, 82],[16, 83],[17, 71],[18, 81],[19, 81],[20, 69],[21, 15],[22, 84],[23, 74],[24, 85],[25, 86],[26, 71],[27, 74],[28, 72],[29, 73],[30, 19],[31, 76],[32, 75],[33, 75],[34, 81]])

export const light_success = n5
const n6 = t([[0, 36],[1, 87],[2, 34],[3, 88],[4, 89],[5, 90],[6, 91],[7, 92],[8, 93],[9, 94],[10, 95],[11, 96],[12, 45],[13, 36],[14, 87],[15, 97],[16, 98],[17, 34],[18, 45],[19, 45],[20, 36],[21, 15],[22, 47],[23, 90],[24, 46],[25, 44],[26, 34],[27, 90],[28, 88],[29, 89],[30, 32],[31, 92],[32, 91],[33, 91],[34, 45]])

export const dark_error = n6
const n7 = t([[0, 54],[1, 99],[2, 52],[3, 100],[4, 101],[5, 102],[6, 103],[7, 104],[8, 105],[9, 106],[10, 107],[11, 108],[12, 63],[13, 54],[14, 99],[15, 109],[16, 110],[17, 52],[18, 63],[19, 63],[20, 54],[21, 15],[22, 65],[23, 102],[24, 64],[25, 62],[26, 52],[27, 102],[28, 100],[29, 101],[30, 32],[31, 104],[32, 103],[33, 103],[34, 63]])

export const dark_warning = n7
const n8 = t([[0, 72],[1, 111],[2, 70],[3, 112],[4, 113],[5, 114],[6, 115],[7, 116],[8, 117],[9, 118],[10, 119],[11, 120],[12, 81],[13, 72],[14, 111],[15, 121],[16, 122],[17, 70],[18, 81],[19, 81],[20, 72],[21, 15],[22, 83],[23, 114],[24, 82],[25, 80],[26, 70],[27, 114],[28, 112],[29, 113],[30, 32],[31, 116],[32, 115],[33, 115],[34, 81]])

export const dark_success = n8
const n9 = t([[0, 15],[1, 15],[2, 19],[3, 123],[4, 124],[5, 125],[6, 126],[7, 127],[8, 128],[9, 129],[10, 130],[11, 131],[12, 132],[13, 15],[14, 15],[15, 133],[16, 134],[17, 19],[18, 132],[19, 132],[20, 15],[21, 15],[22, 135],[23, 125],[24, 136],[25, 137],[26, 19],[27, 125],[28, 123],[29, 124],[30, 19],[31, 127],[32, 126],[33, 126],[34, 132]])

export const light_accent = n9
export const light_active_accent = n9
export const light_disabled_accent = n9
export const light_dim_accent = n9
export const light_error_accent = n9
export const light_warning_accent = n9
export const light_success_accent = n9
const n10 = t([[0, 138],[1, 15],[2, 32],[3, 139],[4, 140],[5, 19],[6, 123],[7, 124],[8, 125],[9, 126],[10, 127],[11, 131],[12, 128],[13, 138],[14, 15],[15, 133],[16, 134],[17, 32],[18, 128],[19, 128],[20, 138],[21, 15],[22, 141],[23, 19],[24, 142],[25, 143],[26, 32],[27, 19],[28, 139],[29, 140],[30, 32],[31, 124],[32, 123],[33, 123],[34, 128]])

export const dark_accent = n10
export const dark_active_accent = n10
export const dark_disabled_accent = n10
export const dark_dim_accent = n10
export const dark_error_accent = n10
export const dark_warning_accent = n10
export const dark_success_accent = n10
const n11 = t([[17, 144]])

export const light_ModalOverlay = n11
export const light_SheetOverlay = n11
export const light_DialogOverlay = n11
export const light_active_ModalOverlay = n11
export const light_active_SheetOverlay = n11
export const light_active_DialogOverlay = n11
export const light_disabled_ModalOverlay = n11
export const light_disabled_SheetOverlay = n11
export const light_disabled_DialogOverlay = n11
export const light_dim_ModalOverlay = n11
export const light_dim_SheetOverlay = n11
export const light_dim_DialogOverlay = n11
export const light_error_ModalOverlay = n11
export const light_error_SheetOverlay = n11
export const light_error_DialogOverlay = n11
export const light_warning_ModalOverlay = n11
export const light_warning_SheetOverlay = n11
export const light_warning_DialogOverlay = n11
export const light_success_ModalOverlay = n11
export const light_success_SheetOverlay = n11
export const light_success_DialogOverlay = n11
export const light_accent_ModalOverlay = n11
export const light_accent_SheetOverlay = n11
export const light_accent_DialogOverlay = n11
export const light_active_accent_ModalOverlay = n11
export const light_active_accent_SheetOverlay = n11
export const light_active_accent_DialogOverlay = n11
export const light_disabled_accent_ModalOverlay = n11
export const light_disabled_accent_SheetOverlay = n11
export const light_disabled_accent_DialogOverlay = n11
export const light_dim_accent_ModalOverlay = n11
export const light_dim_accent_SheetOverlay = n11
export const light_dim_accent_DialogOverlay = n11
export const light_error_accent_ModalOverlay = n11
export const light_error_accent_SheetOverlay = n11
export const light_error_accent_DialogOverlay = n11
export const light_warning_accent_ModalOverlay = n11
export const light_warning_accent_SheetOverlay = n11
export const light_warning_accent_DialogOverlay = n11
export const light_success_accent_ModalOverlay = n11
export const light_success_accent_SheetOverlay = n11
export const light_success_accent_DialogOverlay = n11
const n12 = t([[17, 145]])

export const dark_ModalOverlay = n12
export const dark_SheetOverlay = n12
export const dark_DialogOverlay = n12
export const dark_active_ModalOverlay = n12
export const dark_active_SheetOverlay = n12
export const dark_active_DialogOverlay = n12
export const dark_disabled_ModalOverlay = n12
export const dark_disabled_SheetOverlay = n12
export const dark_disabled_DialogOverlay = n12
export const dark_dim_ModalOverlay = n12
export const dark_dim_SheetOverlay = n12
export const dark_dim_DialogOverlay = n12
export const dark_error_ModalOverlay = n12
export const dark_error_SheetOverlay = n12
export const dark_error_DialogOverlay = n12
export const dark_warning_ModalOverlay = n12
export const dark_warning_SheetOverlay = n12
export const dark_warning_DialogOverlay = n12
export const dark_success_ModalOverlay = n12
export const dark_success_SheetOverlay = n12
export const dark_success_DialogOverlay = n12
export const dark_accent_ModalOverlay = n12
export const dark_accent_SheetOverlay = n12
export const dark_accent_DialogOverlay = n12
export const dark_active_accent_ModalOverlay = n12
export const dark_active_accent_SheetOverlay = n12
export const dark_active_accent_DialogOverlay = n12
export const dark_disabled_accent_ModalOverlay = n12
export const dark_disabled_accent_SheetOverlay = n12
export const dark_disabled_accent_DialogOverlay = n12
export const dark_dim_accent_ModalOverlay = n12
export const dark_dim_accent_SheetOverlay = n12
export const dark_dim_accent_DialogOverlay = n12
export const dark_error_accent_ModalOverlay = n12
export const dark_error_accent_SheetOverlay = n12
export const dark_error_accent_DialogOverlay = n12
export const dark_warning_accent_ModalOverlay = n12
export const dark_warning_accent_SheetOverlay = n12
export const dark_warning_accent_DialogOverlay = n12
export const dark_success_accent_ModalOverlay = n12
export const dark_success_accent_SheetOverlay = n12
export const dark_success_accent_DialogOverlay = n12
const n13 = t([[0, 15],[1, 15],[2, 19],[3, 123],[4, 124],[5, 125],[6, 126],[7, 127],[8, 128],[9, 129],[10, 130],[11, 131],[12, 132],[13, 15],[14, 15],[15, 133],[16, 134],[17, 125],[18, 132],[19, 132],[20, 15],[21, 15],[22, 135],[23, 128],[24, 136],[25, 137],[26, 19],[27, 128],[28, 126],[29, 127],[30, 19],[31, 130],[32, 129],[33, 129],[34, 132]])

export const light_accent_Button = n13
export const light_accent_Switch = n13
const n14 = t([[0, 138],[1, 15],[2, 32],[3, 139],[4, 140],[5, 19],[6, 123],[7, 124],[8, 125],[9, 126],[10, 127],[11, 131],[12, 128],[13, 138],[14, 15],[15, 133],[16, 134],[17, 19],[18, 128],[19, 128],[20, 138],[21, 15],[22, 141],[23, 125],[24, 142],[25, 143],[26, 32],[27, 125],[28, 123],[29, 124],[30, 32],[31, 127],[32, 126],[33, 126],[34, 128]])

export const dark_accent_Button = n14
export const dark_accent_Switch = n14
const n15 = t([[0, 1],[1, 13],[2, 17],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 7],[9, 8],[10, 9],[11, 14],[12, 10],[13, 12],[14, 0],[15, 11],[16, 146],[17, 17],[18, 0],[19, 0],[20, 1],[22, 147],[23, 4],[24, 18],[25, 16],[26, 17],[27, 4],[28, 2],[29, 3],[31, 6],[32, 5],[33, 5],[34, 0]])

export const light_active = n15
const n16 = t([[0, 10],[1, 12],[2, 4],[3, 5],[4, 6],[5, 7],[6, 8],[7, 9],[8, 10],[9, 12],[10, 0],[11, 1],[12, 1],[13, 13],[14, 11],[15, 0],[16, 13],[17, 4],[18, 9],[19, 9],[20, 10],[22, 17],[23, 7],[24, 3],[25, 2],[26, 4],[27, 7],[28, 5],[29, 6],[31, 9],[32, 8],[33, 8],[34, 9]])

export const light_disabled = n16
const n17 = t([[0, 12],[1, 0],[2, 3],[3, 4],[4, 5],[5, 6],[6, 7],[7, 8],[8, 9],[9, 10],[10, 12],[11, 13],[12, 0],[13, 1],[14, 13],[15, 1],[16, 11],[17, 3],[18, 10],[19, 10],[20, 12],[22, 18],[23, 6],[24, 2],[25, 17],[26, 3],[27, 6],[28, 4],[29, 5],[31, 8],[32, 7],[33, 7],[34, 10]])

export const light_dim = n17
const n18 = t([[0, 20],[1, 30],[2, 13],[3, 1],[4, 21],[5, 22],[6, 23],[7, 24],[8, 25],[9, 26],[10, 27],[11, 31],[12, 28],[13, 12],[14, 3],[15, 29],[16, 148],[17, 13],[18, 3],[19, 3],[20, 20],[22, 146],[23, 22],[24, 11],[25, 14],[26, 13],[27, 22],[28, 1],[29, 21],[31, 24],[32, 23],[33, 23],[34, 3]])

export const dark_active = n18
const n19 = t([[0, 28],[1, 12],[2, 22],[3, 23],[4, 24],[5, 25],[6, 26],[7, 27],[8, 28],[9, 12],[10, 3],[11, 20],[12, 20],[13, 30],[14, 29],[15, 3],[16, 30],[17, 22],[18, 27],[19, 27],[20, 28],[22, 13],[23, 25],[24, 21],[25, 1],[26, 22],[27, 25],[28, 23],[29, 24],[31, 27],[32, 26],[33, 26],[34, 27]])

export const dark_disabled = n19
const n20 = t([[0, 12],[1, 3],[2, 21],[3, 22],[4, 23],[5, 24],[6, 25],[7, 26],[8, 27],[9, 28],[10, 12],[11, 30],[12, 3],[13, 20],[14, 30],[15, 20],[16, 29],[17, 21],[18, 28],[19, 28],[20, 12],[22, 11],[23, 24],[24, 1],[25, 13],[26, 21],[27, 24],[28, 22],[29, 23],[31, 26],[32, 25],[33, 25],[34, 28]])

export const dark_dim = n20
const n21 = t([[0, 0],[1, 0],[11, 13],[15, 1],[16, 11],[17, 3],[18, 12],[19, 12],[20, 0],[22, 18],[23, 6],[24, 2],[25, 17],[26, 3],[27, 6],[28, 4],[29, 5],[31, 8],[32, 7],[33, 7],[34, 10]])

export const light_Card = n21
export const light_Progress = n21
export const light_DrawerFrame = n21
export const light_TooltipArrow = n21
const n22 = t([[0, 0],[1, 1],[11, 11],[15, 13],[16, 14],[17, 2],[18, 12],[19, 12],[20, 0],[21, 147],[22, 16],[23, 7],[24, 17],[25, 18],[26, 2],[27, 5],[28, 3],[29, 4],[30, 147],[31, 9],[32, 8],[33, 8],[34, 12]])

export const light_Input = n22
export const light_Checkbox = n22
export const light_TextArea = n22
export const light_RadioGroupItem = n22
const n23 = t([[0, 0],[1, 12],[11, 1],[15, 0],[16, 13],[17, 4],[18, 12],[19, 12],[20, 0],[22, 17],[23, 7],[24, 3],[25, 2],[26, 4],[27, 7],[28, 5],[29, 6],[31, 9],[32, 8],[33, 8],[34, 9]])

export const light_Button = n23
export const light_Switch = n23
export const light_SliderTrack = n23
export const light_TooltipContent = n23
const n24 = t([[0, 3],[1, 2],[11, 18],[15, 17],[16, 16],[17, 1],[18, 4],[19, 4],[20, 3],[21, 147],[22, 14],[23, 10],[24, 13],[25, 11],[26, 1],[27, 10],[28, 0],[29, 12],[30, 147],[31, 8],[32, 9],[33, 9],[34, 4]])

export const light_Tooltip = n24
export const light_SliderThumb = n24
export const light_SwitchThumb = n24
export const light_ProgressIndicator = n24
const n25 = t([[0, 3],[1, 4],[11, 2],[15, 3],[16, 17],[17, 12],[18, 4],[19, 4],[20, 3],[21, 147],[22, 13],[23, 8],[24, 0],[25, 1],[26, 12],[27, 8],[28, 10],[29, 9],[30, 147],[31, 6],[32, 7],[33, 7],[34, 6]])

export const light_SliderTrackActive = n25
const n26 = t([[0, 3],[1, 3],[11, 30],[15, 20],[16, 29],[17, 21],[18, 12],[19, 12],[20, 3],[22, 11],[23, 24],[24, 1],[25, 13],[26, 21],[27, 24],[28, 22],[29, 23],[31, 26],[32, 25],[33, 25],[34, 28]])

export const dark_Card = n26
export const dark_Progress = n26
export const dark_DrawerFrame = n26
export const dark_TooltipArrow = n26
const n27 = t([[0, 3],[1, 20],[11, 29],[15, 30],[16, 31],[17, 1],[18, 12],[19, 12],[20, 3],[21, 146],[22, 14],[23, 25],[24, 13],[25, 11],[26, 1],[27, 23],[28, 21],[29, 22],[30, 146],[31, 27],[32, 26],[33, 26],[34, 12]])

export const dark_Input = n27
export const dark_Checkbox = n27
export const dark_TextArea = n27
export const dark_RadioGroupItem = n27
const n28 = t([[0, 3],[1, 12],[11, 20],[15, 3],[16, 30],[17, 22],[18, 12],[19, 12],[20, 3],[22, 13],[23, 25],[24, 21],[25, 1],[26, 22],[27, 25],[28, 23],[29, 24],[31, 27],[32, 26],[33, 26],[34, 27]])

export const dark_Button = n28
export const dark_Switch = n28
export const dark_SliderTrack = n28
export const dark_TooltipContent = n28
const n29 = t([[0, 21],[1, 1],[11, 11],[15, 13],[16, 14],[17, 20],[18, 22],[19, 22],[20, 21],[21, 146],[22, 31],[23, 28],[24, 30],[25, 29],[26, 20],[27, 28],[28, 3],[29, 12],[30, 146],[31, 26],[32, 27],[33, 27],[34, 22]])

export const dark_Tooltip = n29
export const dark_SliderThumb = n29
export const dark_SwitchThumb = n29
export const dark_ProgressIndicator = n29
const n30 = t([[0, 21],[1, 22],[11, 1],[15, 21],[16, 13],[17, 12],[18, 22],[19, 22],[20, 21],[21, 146],[22, 30],[23, 26],[24, 3],[25, 20],[26, 12],[27, 26],[28, 28],[29, 27],[30, 146],[31, 24],[32, 25],[33, 25],[34, 24]])

export const dark_SliderTrackActive = n30
const n31 = t([[0, 1],[1, 1],[11, 11],[15, 13],[16, 14],[17, 2],[18, 0],[19, 0],[20, 1],[22, 16],[23, 5],[24, 17],[25, 18],[26, 2],[27, 5],[28, 3],[29, 4],[31, 7],[32, 6],[33, 6],[34, 12]])

export const light_active_Card = n31
export const light_active_Progress = n31
export const light_active_DrawerFrame = n31
export const light_active_TooltipArrow = n31
const n32 = t([[0, 1],[1, 13],[11, 14],[15, 11],[16, 146],[17, 17],[18, 0],[19, 0],[20, 1],[22, 147],[23, 6],[24, 18],[25, 16],[26, 17],[27, 4],[28, 2],[29, 3],[31, 8],[32, 7],[33, 7],[34, 0]])

export const light_active_Input = n32
export const light_active_Checkbox = n32
export const light_active_TextArea = n32
export const light_active_RadioGroupItem = n32
const n33 = t([[0, 1],[1, 0],[11, 13],[15, 1],[16, 11],[17, 3],[18, 0],[19, 0],[20, 1],[22, 18],[23, 6],[24, 2],[25, 17],[26, 3],[27, 6],[28, 4],[29, 5],[31, 8],[32, 7],[33, 7],[34, 10]])

export const light_active_Button = n33
export const light_active_Switch = n33
export const light_active_SliderTrack = n33
export const light_active_TooltipContent = n33
const n34 = t([[0, 2],[1, 17],[11, 16],[15, 18],[16, 147],[17, 13],[18, 3],[19, 3],[20, 2],[22, 146],[23, 12],[24, 11],[25, 14],[26, 13],[27, 12],[28, 1],[29, 0],[31, 9],[32, 10],[33, 10],[34, 3]])

export const light_active_Tooltip = n34
export const light_active_SliderThumb = n34
export const light_active_SwitchThumb = n34
export const light_active_ProgressIndicator = n34
const n35 = t([[0, 2],[1, 3],[11, 17],[15, 2],[16, 18],[17, 0],[18, 3],[19, 3],[20, 2],[22, 11],[23, 9],[24, 1],[25, 13],[26, 0],[27, 9],[28, 12],[29, 10],[31, 7],[32, 8],[33, 8],[34, 5]])

export const light_active_SliderTrackActive = n35
const n36 = t([[0, 10],[1, 10],[11, 0],[15, 12],[16, 1],[17, 5],[18, 9],[19, 9],[20, 10],[22, 2],[23, 8],[24, 4],[25, 3],[26, 5],[27, 8],[28, 6],[29, 7],[31, 10],[32, 9],[33, 9],[34, 8]])

export const light_disabled_Card = n36
export const light_disabled_Progress = n36
export const light_disabled_DrawerFrame = n36
export const light_disabled_TooltipArrow = n36
const n37 = t([[0, 10],[1, 12],[11, 1],[15, 0],[16, 13],[17, 4],[18, 9],[19, 9],[20, 10],[22, 17],[23, 9],[24, 3],[25, 2],[26, 4],[27, 7],[28, 5],[29, 6],[31, 12],[32, 10],[33, 10],[34, 9]])

export const light_disabled_Input = n37
export const light_disabled_Checkbox = n37
export const light_disabled_TextArea = n37
export const light_disabled_RadioGroupItem = n37
const n38 = t([[0, 10],[1, 9],[11, 12],[15, 10],[16, 0],[17, 6],[18, 9],[19, 9],[20, 10],[22, 3],[23, 9],[24, 5],[25, 4],[26, 6],[27, 9],[28, 7],[29, 8],[31, 12],[32, 10],[33, 10],[34, 7]])

export const light_disabled_Button = n38
export const light_disabled_Switch = n38
export const light_disabled_SliderTrack = n38
export const light_disabled_TooltipContent = n38
const n39 = t([[0, 5],[1, 4],[11, 2],[15, 3],[16, 17],[17, 12],[18, 6],[19, 6],[20, 5],[22, 13],[23, 8],[24, 0],[25, 1],[26, 12],[27, 8],[28, 10],[29, 9],[31, 6],[32, 7],[33, 7],[34, 6]])

export const light_disabled_Tooltip = n39
export const light_disabled_SliderThumb = n39
export const light_disabled_SwitchThumb = n39
export const light_disabled_ProgressIndicator = n39
const n40 = t([[0, 5],[1, 6],[11, 4],[15, 5],[16, 3],[17, 9],[18, 6],[19, 6],[20, 5],[22, 0],[23, 6],[24, 10],[25, 12],[26, 9],[27, 6],[28, 8],[29, 7],[31, 4],[32, 5],[33, 5],[34, 8]])

export const light_disabled_SliderTrackActive = n40
const n41 = t([[0, 12],[1, 12],[11, 1],[15, 0],[16, 13],[17, 4],[18, 10],[19, 10],[20, 12],[22, 17],[23, 7],[24, 3],[25, 2],[26, 4],[27, 7],[28, 5],[29, 6],[31, 9],[32, 8],[33, 8],[34, 9]])

export const light_dim_Card = n41
export const light_dim_Progress = n41
export const light_dim_DrawerFrame = n41
export const light_dim_TooltipArrow = n41
const n42 = t([[0, 12],[1, 0],[11, 13],[15, 1],[16, 11],[17, 3],[18, 10],[19, 10],[20, 12],[22, 18],[23, 8],[24, 2],[25, 17],[26, 3],[27, 6],[28, 4],[29, 5],[31, 10],[32, 9],[33, 9],[34, 10]])

export const light_dim_Input = n42
export const light_dim_Checkbox = n42
export const light_dim_TextArea = n42
export const light_dim_RadioGroupItem = n42
const n43 = t([[0, 12],[1, 10],[11, 0],[15, 12],[16, 1],[17, 5],[18, 10],[19, 10],[20, 12],[22, 2],[23, 8],[24, 4],[25, 3],[26, 5],[27, 8],[28, 6],[29, 7],[31, 10],[32, 9],[33, 9],[34, 8]])

export const light_dim_Button = n43
export const light_dim_Switch = n43
export const light_dim_SliderTrack = n43
export const light_dim_TooltipContent = n43
const n44 = t([[0, 4],[1, 3],[11, 17],[15, 2],[16, 18],[17, 0],[18, 5],[19, 5],[20, 4],[22, 11],[23, 9],[24, 1],[25, 13],[26, 0],[27, 9],[28, 12],[29, 10],[31, 7],[32, 8],[33, 8],[34, 5]])

export const light_dim_Tooltip = n44
export const light_dim_SliderThumb = n44
export const light_dim_SwitchThumb = n44
export const light_dim_ProgressIndicator = n44
const n45 = t([[0, 4],[1, 5],[11, 3],[15, 4],[16, 2],[17, 10],[18, 5],[19, 5],[20, 4],[22, 1],[23, 7],[24, 12],[25, 0],[26, 10],[27, 7],[28, 9],[29, 8],[31, 5],[32, 6],[33, 6],[34, 7]])

export const light_dim_SliderTrackActive = n45
const n46 = t([[0, 33],[1, 33],[11, 46],[15, 34],[16, 44],[17, 36],[18, 45],[19, 45],[20, 33],[22, 50],[23, 39],[24, 35],[25, 49],[26, 36],[27, 39],[28, 37],[29, 38],[31, 41],[32, 40],[33, 40],[34, 43]])

export const light_error_Card = n46
export const light_error_Progress = n46
export const light_error_DrawerFrame = n46
export const light_error_TooltipArrow = n46
const n47 = t([[0, 33],[1, 34],[11, 44],[15, 46],[16, 47],[17, 35],[18, 45],[19, 45],[20, 33],[21, 149],[22, 48],[23, 40],[24, 49],[25, 50],[26, 35],[27, 38],[28, 36],[29, 37],[30, 149],[31, 42],[32, 41],[33, 41],[34, 45]])

export const light_error_Input = n47
export const light_error_Checkbox = n47
export const light_error_TextArea = n47
export const light_error_RadioGroupItem = n47
const n48 = t([[0, 33],[1, 45],[11, 34],[15, 33],[16, 46],[17, 37],[18, 45],[19, 45],[20, 33],[22, 49],[23, 40],[24, 36],[25, 35],[26, 37],[27, 40],[28, 38],[29, 39],[31, 42],[32, 41],[33, 41],[34, 42]])

export const light_error_Button = n48
export const light_error_Switch = n48
export const light_error_SliderTrack = n48
export const light_error_TooltipContent = n48
const n49 = t([[0, 36],[1, 35],[11, 50],[15, 49],[16, 48],[17, 34],[18, 37],[19, 37],[20, 36],[21, 149],[22, 47],[23, 43],[24, 46],[25, 44],[26, 34],[27, 43],[28, 33],[29, 45],[30, 149],[31, 41],[32, 42],[33, 42],[34, 37]])

export const light_error_Tooltip = n49
export const light_error_SliderThumb = n49
export const light_error_SwitchThumb = n49
export const light_error_ProgressIndicator = n49
const n50 = t([[0, 36],[1, 37],[11, 35],[15, 36],[16, 49],[17, 45],[18, 37],[19, 37],[20, 36],[21, 149],[22, 46],[23, 41],[24, 33],[25, 34],[26, 45],[27, 41],[28, 43],[29, 42],[30, 149],[31, 39],[32, 40],[33, 40],[34, 39]])

export const light_error_SliderTrackActive = n50
const n51 = t([[0, 51],[1, 51],[11, 64],[15, 52],[16, 62],[17, 54],[18, 63],[19, 63],[20, 51],[22, 68],[23, 57],[24, 53],[25, 67],[26, 54],[27, 57],[28, 55],[29, 56],[31, 59],[32, 58],[33, 58],[34, 61]])

export const light_warning_Card = n51
export const light_warning_Progress = n51
export const light_warning_DrawerFrame = n51
export const light_warning_TooltipArrow = n51
const n52 = t([[0, 51],[1, 52],[11, 62],[15, 64],[16, 65],[17, 53],[18, 63],[19, 63],[20, 51],[21, 150],[22, 66],[23, 58],[24, 67],[25, 68],[26, 53],[27, 56],[28, 54],[29, 55],[30, 150],[31, 60],[32, 59],[33, 59],[34, 63]])

export const light_warning_Input = n52
export const light_warning_Checkbox = n52
export const light_warning_TextArea = n52
export const light_warning_RadioGroupItem = n52
const n53 = t([[0, 51],[1, 63],[11, 52],[15, 51],[16, 64],[17, 55],[18, 63],[19, 63],[20, 51],[22, 67],[23, 58],[24, 54],[25, 53],[26, 55],[27, 58],[28, 56],[29, 57],[31, 60],[32, 59],[33, 59],[34, 60]])

export const light_warning_Button = n53
export const light_warning_Switch = n53
export const light_warning_SliderTrack = n53
export const light_warning_TooltipContent = n53
const n54 = t([[0, 54],[1, 53],[11, 68],[15, 67],[16, 66],[17, 52],[18, 55],[19, 55],[20, 54],[21, 150],[22, 65],[23, 61],[24, 64],[25, 62],[26, 52],[27, 61],[28, 51],[29, 63],[30, 150],[31, 59],[32, 60],[33, 60],[34, 55]])

export const light_warning_Tooltip = n54
export const light_warning_SliderThumb = n54
export const light_warning_SwitchThumb = n54
export const light_warning_ProgressIndicator = n54
const n55 = t([[0, 54],[1, 55],[11, 53],[15, 54],[16, 67],[17, 63],[18, 55],[19, 55],[20, 54],[21, 150],[22, 64],[23, 59],[24, 51],[25, 52],[26, 63],[27, 59],[28, 61],[29, 60],[30, 150],[31, 57],[32, 58],[33, 58],[34, 57]])

export const light_warning_SliderTrackActive = n55
const n56 = t([[0, 69],[1, 69],[11, 82],[15, 70],[16, 80],[17, 72],[18, 81],[19, 81],[20, 69],[22, 86],[23, 75],[24, 71],[25, 85],[26, 72],[27, 75],[28, 73],[29, 74],[31, 77],[32, 76],[33, 76],[34, 79]])

export const light_success_Card = n56
export const light_success_Progress = n56
export const light_success_DrawerFrame = n56
export const light_success_TooltipArrow = n56
const n57 = t([[0, 69],[1, 70],[11, 80],[15, 82],[16, 83],[17, 71],[18, 81],[19, 81],[20, 69],[21, 151],[22, 84],[23, 76],[24, 85],[25, 86],[26, 71],[27, 74],[28, 72],[29, 73],[30, 151],[31, 78],[32, 77],[33, 77],[34, 81]])

export const light_success_Input = n57
export const light_success_Checkbox = n57
export const light_success_TextArea = n57
export const light_success_RadioGroupItem = n57
const n58 = t([[0, 69],[1, 81],[11, 70],[15, 69],[16, 82],[17, 73],[18, 81],[19, 81],[20, 69],[22, 85],[23, 76],[24, 72],[25, 71],[26, 73],[27, 76],[28, 74],[29, 75],[31, 78],[32, 77],[33, 77],[34, 78]])

export const light_success_Button = n58
export const light_success_Switch = n58
export const light_success_SliderTrack = n58
export const light_success_TooltipContent = n58
const n59 = t([[0, 72],[1, 71],[11, 86],[15, 85],[16, 84],[17, 70],[18, 73],[19, 73],[20, 72],[21, 151],[22, 83],[23, 79],[24, 82],[25, 80],[26, 70],[27, 79],[28, 69],[29, 81],[30, 151],[31, 77],[32, 78],[33, 78],[34, 73]])

export const light_success_Tooltip = n59
export const light_success_SliderThumb = n59
export const light_success_SwitchThumb = n59
export const light_success_ProgressIndicator = n59
const n60 = t([[0, 72],[1, 73],[11, 71],[15, 72],[16, 85],[17, 81],[18, 73],[19, 73],[20, 72],[21, 151],[22, 82],[23, 77],[24, 69],[25, 70],[26, 81],[27, 77],[28, 79],[29, 78],[30, 151],[31, 75],[32, 76],[33, 76],[34, 75]])

export const light_success_SliderTrackActive = n60
const n61 = t([[0, 20],[1, 20],[11, 29],[15, 30],[16, 31],[17, 1],[18, 3],[19, 3],[20, 20],[22, 14],[23, 23],[24, 13],[25, 11],[26, 1],[27, 23],[28, 21],[29, 22],[31, 25],[32, 24],[33, 24],[34, 12]])

export const dark_active_Card = n61
export const dark_active_Progress = n61
export const dark_active_DrawerFrame = n61
export const dark_active_TooltipArrow = n61
const n62 = t([[0, 20],[1, 30],[11, 31],[15, 29],[16, 148],[17, 13],[18, 3],[19, 3],[20, 20],[22, 146],[23, 24],[24, 11],[25, 14],[26, 13],[27, 22],[28, 1],[29, 21],[31, 26],[32, 25],[33, 25],[34, 3]])

export const dark_active_Input = n62
export const dark_active_Checkbox = n62
export const dark_active_TextArea = n62
export const dark_active_RadioGroupItem = n62
const n63 = t([[0, 20],[1, 3],[11, 30],[15, 20],[16, 29],[17, 21],[18, 3],[19, 3],[20, 20],[22, 11],[23, 24],[24, 1],[25, 13],[26, 21],[27, 24],[28, 22],[29, 23],[31, 26],[32, 25],[33, 25],[34, 28]])

export const dark_active_Button = n63
export const dark_active_Switch = n63
export const dark_active_SliderTrack = n63
export const dark_active_TooltipContent = n63
const n64 = t([[0, 1],[1, 13],[11, 14],[15, 11],[16, 146],[17, 30],[18, 21],[19, 21],[20, 1],[22, 148],[23, 12],[24, 29],[25, 31],[26, 30],[27, 12],[28, 20],[29, 3],[31, 27],[32, 28],[33, 28],[34, 21]])

export const dark_active_Tooltip = n64
export const dark_active_SliderThumb = n64
export const dark_active_SwitchThumb = n64
export const dark_active_ProgressIndicator = n64
const n65 = t([[0, 1],[1, 21],[11, 13],[15, 1],[16, 11],[17, 3],[18, 21],[19, 21],[20, 1],[22, 29],[23, 27],[24, 20],[25, 30],[26, 3],[27, 27],[28, 12],[29, 28],[31, 25],[32, 26],[33, 26],[34, 23]])

export const dark_active_SliderTrackActive = n65
const n66 = t([[0, 28],[1, 28],[11, 3],[15, 12],[16, 20],[17, 23],[18, 27],[19, 27],[20, 28],[22, 1],[23, 26],[24, 22],[25, 21],[26, 23],[27, 26],[28, 24],[29, 25],[31, 28],[32, 27],[33, 27],[34, 26]])

export const dark_disabled_Card = n66
export const dark_disabled_Progress = n66
export const dark_disabled_DrawerFrame = n66
export const dark_disabled_TooltipArrow = n66
const n67 = t([[0, 28],[1, 12],[11, 20],[15, 3],[16, 30],[17, 22],[18, 27],[19, 27],[20, 28],[22, 13],[23, 27],[24, 21],[25, 1],[26, 22],[27, 25],[28, 23],[29, 24],[31, 12],[32, 28],[33, 28],[34, 27]])

export const dark_disabled_Input = n67
export const dark_disabled_Checkbox = n67
export const dark_disabled_TextArea = n67
export const dark_disabled_RadioGroupItem = n67
const n68 = t([[0, 28],[1, 27],[11, 12],[15, 28],[16, 3],[17, 24],[18, 27],[19, 27],[20, 28],[22, 21],[23, 27],[24, 23],[25, 22],[26, 24],[27, 27],[28, 25],[29, 26],[31, 12],[32, 28],[33, 28],[34, 25]])

export const dark_disabled_Button = n68
export const dark_disabled_Switch = n68
export const dark_disabled_SliderTrack = n68
export const dark_disabled_TooltipContent = n68
const n69 = t([[0, 23],[1, 22],[11, 1],[15, 21],[16, 13],[17, 12],[18, 24],[19, 24],[20, 23],[22, 30],[23, 26],[24, 3],[25, 20],[26, 12],[27, 26],[28, 28],[29, 27],[31, 24],[32, 25],[33, 25],[34, 24]])

export const dark_disabled_Tooltip = n69
export const dark_disabled_SliderThumb = n69
export const dark_disabled_SwitchThumb = n69
export const dark_disabled_ProgressIndicator = n69
const n70 = t([[0, 23],[1, 24],[11, 22],[15, 23],[16, 21],[17, 27],[18, 24],[19, 24],[20, 23],[22, 3],[23, 24],[24, 28],[25, 12],[26, 27],[27, 24],[28, 26],[29, 25],[31, 22],[32, 23],[33, 23],[34, 26]])

export const dark_disabled_SliderTrackActive = n70
const n71 = t([[0, 12],[1, 12],[11, 20],[15, 3],[16, 30],[17, 22],[18, 28],[19, 28],[20, 12],[22, 13],[23, 25],[24, 21],[25, 1],[26, 22],[27, 25],[28, 23],[29, 24],[31, 27],[32, 26],[33, 26],[34, 27]])

export const dark_dim_Card = n71
export const dark_dim_Progress = n71
export const dark_dim_DrawerFrame = n71
export const dark_dim_TooltipArrow = n71
const n72 = t([[0, 12],[1, 3],[11, 30],[15, 20],[16, 29],[17, 21],[18, 28],[19, 28],[20, 12],[22, 11],[23, 26],[24, 1],[25, 13],[26, 21],[27, 24],[28, 22],[29, 23],[31, 28],[32, 27],[33, 27],[34, 28]])

export const dark_dim_Input = n72
export const dark_dim_Checkbox = n72
export const dark_dim_TextArea = n72
export const dark_dim_RadioGroupItem = n72
const n73 = t([[0, 12],[1, 28],[11, 3],[15, 12],[16, 20],[17, 23],[18, 28],[19, 28],[20, 12],[22, 1],[23, 26],[24, 22],[25, 21],[26, 23],[27, 26],[28, 24],[29, 25],[31, 28],[32, 27],[33, 27],[34, 26]])

export const dark_dim_Button = n73
export const dark_dim_Switch = n73
export const dark_dim_SliderTrack = n73
export const dark_dim_TooltipContent = n73
const n74 = t([[0, 22],[1, 21],[11, 13],[15, 1],[16, 11],[17, 3],[18, 23],[19, 23],[20, 22],[22, 29],[23, 27],[24, 20],[25, 30],[26, 3],[27, 27],[28, 12],[29, 28],[31, 25],[32, 26],[33, 26],[34, 23]])

export const dark_dim_Tooltip = n74
export const dark_dim_SliderThumb = n74
export const dark_dim_SwitchThumb = n74
export const dark_dim_ProgressIndicator = n74
const n75 = t([[0, 22],[1, 23],[11, 21],[15, 22],[16, 1],[17, 28],[18, 23],[19, 23],[20, 22],[22, 20],[23, 25],[24, 12],[25, 3],[26, 28],[27, 25],[28, 27],[29, 26],[31, 23],[32, 24],[33, 24],[34, 25]])

export const dark_dim_SliderTrackActive = n75
const n76 = t([[0, 36],[1, 36],[11, 97],[15, 87],[16, 96],[17, 88],[18, 45],[19, 45],[20, 36],[22, 44],[23, 91],[24, 34],[25, 46],[26, 88],[27, 91],[28, 89],[29, 90],[31, 93],[32, 92],[33, 92],[34, 95]])

export const dark_error_Card = n76
export const dark_error_Progress = n76
export const dark_error_DrawerFrame = n76
export const dark_error_TooltipArrow = n76
const n77 = t([[0, 36],[1, 87],[11, 96],[15, 97],[16, 98],[17, 34],[18, 45],[19, 45],[20, 36],[21, 152],[22, 47],[23, 92],[24, 46],[25, 44],[26, 34],[27, 90],[28, 88],[29, 89],[30, 152],[31, 94],[32, 93],[33, 93],[34, 45]])

export const dark_error_Input = n77
export const dark_error_Checkbox = n77
export const dark_error_TextArea = n77
export const dark_error_RadioGroupItem = n77
const n78 = t([[0, 36],[1, 45],[11, 87],[15, 36],[16, 97],[17, 89],[18, 45],[19, 45],[20, 36],[22, 46],[23, 92],[24, 88],[25, 34],[26, 89],[27, 92],[28, 90],[29, 91],[31, 94],[32, 93],[33, 93],[34, 94]])

export const dark_error_Button = n78
export const dark_error_Switch = n78
export const dark_error_SliderTrack = n78
export const dark_error_TooltipContent = n78
const n79 = t([[0, 88],[1, 34],[11, 44],[15, 46],[16, 47],[17, 87],[18, 89],[19, 89],[20, 88],[21, 152],[22, 98],[23, 95],[24, 97],[25, 96],[26, 87],[27, 95],[28, 36],[29, 45],[30, 152],[31, 93],[32, 94],[33, 94],[34, 89]])

export const dark_error_Tooltip = n79
export const dark_error_SliderThumb = n79
export const dark_error_SwitchThumb = n79
export const dark_error_ProgressIndicator = n79
const n80 = t([[0, 88],[1, 89],[11, 34],[15, 88],[16, 46],[17, 45],[18, 89],[19, 89],[20, 88],[21, 152],[22, 97],[23, 93],[24, 36],[25, 87],[26, 45],[27, 93],[28, 95],[29, 94],[30, 152],[31, 91],[32, 92],[33, 92],[34, 91]])

export const dark_error_SliderTrackActive = n80
const n81 = t([[0, 54],[1, 54],[11, 109],[15, 99],[16, 108],[17, 100],[18, 63],[19, 63],[20, 54],[22, 62],[23, 103],[24, 52],[25, 64],[26, 100],[27, 103],[28, 101],[29, 102],[31, 105],[32, 104],[33, 104],[34, 107]])

export const dark_warning_Card = n81
export const dark_warning_Progress = n81
export const dark_warning_DrawerFrame = n81
export const dark_warning_TooltipArrow = n81
const n82 = t([[0, 54],[1, 99],[11, 108],[15, 109],[16, 110],[17, 52],[18, 63],[19, 63],[20, 54],[21, 153],[22, 65],[23, 104],[24, 64],[25, 62],[26, 52],[27, 102],[28, 100],[29, 101],[30, 153],[31, 106],[32, 105],[33, 105],[34, 63]])

export const dark_warning_Input = n82
export const dark_warning_Checkbox = n82
export const dark_warning_TextArea = n82
export const dark_warning_RadioGroupItem = n82
const n83 = t([[0, 54],[1, 63],[11, 99],[15, 54],[16, 109],[17, 101],[18, 63],[19, 63],[20, 54],[22, 64],[23, 104],[24, 100],[25, 52],[26, 101],[27, 104],[28, 102],[29, 103],[31, 106],[32, 105],[33, 105],[34, 106]])

export const dark_warning_Button = n83
export const dark_warning_Switch = n83
export const dark_warning_SliderTrack = n83
export const dark_warning_TooltipContent = n83
const n84 = t([[0, 100],[1, 52],[11, 62],[15, 64],[16, 65],[17, 99],[18, 101],[19, 101],[20, 100],[21, 153],[22, 110],[23, 107],[24, 109],[25, 108],[26, 99],[27, 107],[28, 54],[29, 63],[30, 153],[31, 105],[32, 106],[33, 106],[34, 101]])

export const dark_warning_Tooltip = n84
export const dark_warning_SliderThumb = n84
export const dark_warning_SwitchThumb = n84
export const dark_warning_ProgressIndicator = n84
const n85 = t([[0, 100],[1, 101],[11, 52],[15, 100],[16, 64],[17, 63],[18, 101],[19, 101],[20, 100],[21, 153],[22, 109],[23, 105],[24, 54],[25, 99],[26, 63],[27, 105],[28, 107],[29, 106],[30, 153],[31, 103],[32, 104],[33, 104],[34, 103]])

export const dark_warning_SliderTrackActive = n85
const n86 = t([[0, 72],[1, 72],[11, 121],[15, 111],[16, 120],[17, 112],[18, 81],[19, 81],[20, 72],[22, 80],[23, 115],[24, 70],[25, 82],[26, 112],[27, 115],[28, 113],[29, 114],[31, 117],[32, 116],[33, 116],[34, 119]])

export const dark_success_Card = n86
export const dark_success_Progress = n86
export const dark_success_DrawerFrame = n86
export const dark_success_TooltipArrow = n86
const n87 = t([[0, 72],[1, 111],[11, 120],[15, 121],[16, 122],[17, 70],[18, 81],[19, 81],[20, 72],[21, 154],[22, 83],[23, 116],[24, 82],[25, 80],[26, 70],[27, 114],[28, 112],[29, 113],[30, 154],[31, 118],[32, 117],[33, 117],[34, 81]])

export const dark_success_Input = n87
export const dark_success_Checkbox = n87
export const dark_success_TextArea = n87
export const dark_success_RadioGroupItem = n87
const n88 = t([[0, 72],[1, 81],[11, 111],[15, 72],[16, 121],[17, 113],[18, 81],[19, 81],[20, 72],[22, 82],[23, 116],[24, 112],[25, 70],[26, 113],[27, 116],[28, 114],[29, 115],[31, 118],[32, 117],[33, 117],[34, 118]])

export const dark_success_Button = n88
export const dark_success_Switch = n88
export const dark_success_SliderTrack = n88
export const dark_success_TooltipContent = n88
const n89 = t([[0, 112],[1, 70],[11, 80],[15, 82],[16, 83],[17, 111],[18, 113],[19, 113],[20, 112],[21, 154],[22, 122],[23, 119],[24, 121],[25, 120],[26, 111],[27, 119],[28, 72],[29, 81],[30, 154],[31, 117],[32, 118],[33, 118],[34, 113]])

export const dark_success_Tooltip = n89
export const dark_success_SliderThumb = n89
export const dark_success_SwitchThumb = n89
export const dark_success_ProgressIndicator = n89
const n90 = t([[0, 112],[1, 113],[11, 70],[15, 112],[16, 82],[17, 81],[18, 113],[19, 113],[20, 112],[21, 154],[22, 121],[23, 117],[24, 72],[25, 111],[26, 81],[27, 117],[28, 119],[29, 118],[30, 154],[31, 115],[32, 116],[33, 116],[34, 115]])

export const dark_success_SliderTrackActive = n90
const n91 = t([[0, 15],[1, 15],[11, 133],[15, 15],[16, 131],[17, 123],[18, 132],[19, 132],[20, 15],[22, 137],[23, 126],[24, 19],[25, 136],[26, 123],[27, 126],[28, 124],[29, 125],[31, 128],[32, 127],[33, 127],[34, 130]])

export const light_accent_Card = n91
export const light_accent_Progress = n91
export const light_accent_DrawerFrame = n91
export const light_accent_TooltipArrow = n91
export const light_active_accent_Card = n91
export const light_active_accent_Progress = n91
export const light_active_accent_DrawerFrame = n91
export const light_active_accent_TooltipArrow = n91
export const light_disabled_accent_Card = n91
export const light_disabled_accent_Progress = n91
export const light_disabled_accent_DrawerFrame = n91
export const light_disabled_accent_TooltipArrow = n91
export const light_dim_accent_Card = n91
export const light_dim_accent_Progress = n91
export const light_dim_accent_DrawerFrame = n91
export const light_dim_accent_TooltipArrow = n91
export const light_error_accent_Card = n91
export const light_error_accent_Progress = n91
export const light_error_accent_DrawerFrame = n91
export const light_error_accent_TooltipArrow = n91
export const light_warning_accent_Card = n91
export const light_warning_accent_Progress = n91
export const light_warning_accent_DrawerFrame = n91
export const light_warning_accent_TooltipArrow = n91
export const light_success_accent_Card = n91
export const light_success_accent_Progress = n91
export const light_success_accent_DrawerFrame = n91
export const light_success_accent_TooltipArrow = n91
const n92 = t([[0, 15],[1, 15],[11, 131],[15, 133],[16, 134],[17, 19],[18, 132],[19, 132],[20, 15],[21, 155],[22, 135],[23, 127],[24, 136],[25, 137],[26, 19],[27, 125],[28, 123],[29, 124],[30, 155],[31, 129],[32, 128],[33, 128],[34, 132]])

export const light_accent_Input = n92
export const light_accent_Checkbox = n92
export const light_accent_TextArea = n92
export const light_accent_RadioGroupItem = n92
export const light_active_accent_Input = n92
export const light_active_accent_Checkbox = n92
export const light_active_accent_TextArea = n92
export const light_active_accent_RadioGroupItem = n92
export const light_disabled_accent_Input = n92
export const light_disabled_accent_Checkbox = n92
export const light_disabled_accent_TextArea = n92
export const light_disabled_accent_RadioGroupItem = n92
export const light_dim_accent_Input = n92
export const light_dim_accent_Checkbox = n92
export const light_dim_accent_TextArea = n92
export const light_dim_accent_RadioGroupItem = n92
export const light_error_accent_Input = n92
export const light_error_accent_Checkbox = n92
export const light_error_accent_TextArea = n92
export const light_error_accent_RadioGroupItem = n92
export const light_warning_accent_Input = n92
export const light_warning_accent_Checkbox = n92
export const light_warning_accent_TextArea = n92
export const light_warning_accent_RadioGroupItem = n92
export const light_success_accent_Input = n92
export const light_success_accent_Checkbox = n92
export const light_success_accent_TextArea = n92
export const light_success_accent_RadioGroupItem = n92
const n93 = t([[0, 123],[1, 19],[11, 137],[15, 136],[16, 135],[17, 15],[18, 124],[19, 124],[20, 123],[21, 155],[22, 134],[23, 130],[24, 133],[25, 131],[26, 15],[27, 130],[28, 15],[29, 132],[30, 155],[31, 128],[32, 129],[33, 129],[34, 124]])

export const light_accent_Tooltip = n93
export const light_accent_SliderThumb = n93
export const light_accent_SwitchThumb = n93
export const light_accent_ProgressIndicator = n93
export const light_active_accent_Tooltip = n93
export const light_active_accent_SliderThumb = n93
export const light_active_accent_SwitchThumb = n93
export const light_active_accent_ProgressIndicator = n93
export const light_disabled_accent_Tooltip = n93
export const light_disabled_accent_SliderThumb = n93
export const light_disabled_accent_SwitchThumb = n93
export const light_disabled_accent_ProgressIndicator = n93
export const light_dim_accent_Tooltip = n93
export const light_dim_accent_SliderThumb = n93
export const light_dim_accent_SwitchThumb = n93
export const light_dim_accent_ProgressIndicator = n93
export const light_error_accent_Tooltip = n93
export const light_error_accent_SliderThumb = n93
export const light_error_accent_SwitchThumb = n93
export const light_error_accent_ProgressIndicator = n93
export const light_warning_accent_Tooltip = n93
export const light_warning_accent_SliderThumb = n93
export const light_warning_accent_SwitchThumb = n93
export const light_warning_accent_ProgressIndicator = n93
export const light_success_accent_Tooltip = n93
export const light_success_accent_SliderThumb = n93
export const light_success_accent_SwitchThumb = n93
export const light_success_accent_ProgressIndicator = n93
const n94 = t([[0, 15],[1, 132],[11, 15],[15, 15],[16, 133],[17, 124],[18, 132],[19, 132],[20, 15],[22, 136],[23, 127],[24, 123],[25, 19],[26, 124],[27, 127],[28, 125],[29, 126],[31, 129],[32, 128],[33, 128],[34, 129]])

export const light_accent_SliderTrack = n94
export const light_accent_TooltipContent = n94
export const light_active_accent_Button = n94
export const light_active_accent_Switch = n94
export const light_active_accent_SliderTrack = n94
export const light_active_accent_TooltipContent = n94
export const light_disabled_accent_Button = n94
export const light_disabled_accent_Switch = n94
export const light_disabled_accent_SliderTrack = n94
export const light_disabled_accent_TooltipContent = n94
export const light_dim_accent_Button = n94
export const light_dim_accent_Switch = n94
export const light_dim_accent_SliderTrack = n94
export const light_dim_accent_TooltipContent = n94
export const light_error_accent_Button = n94
export const light_error_accent_Switch = n94
export const light_error_accent_SliderTrack = n94
export const light_error_accent_TooltipContent = n94
export const light_warning_accent_Button = n94
export const light_warning_accent_Switch = n94
export const light_warning_accent_SliderTrack = n94
export const light_warning_accent_TooltipContent = n94
export const light_success_accent_Button = n94
export const light_success_accent_Switch = n94
export const light_success_accent_SliderTrack = n94
export const light_success_accent_TooltipContent = n94
const n95 = t([[0, 123],[1, 124],[11, 19],[15, 123],[16, 136],[17, 132],[18, 124],[19, 124],[20, 123],[21, 155],[22, 133],[23, 128],[24, 15],[25, 15],[26, 132],[27, 128],[28, 130],[29, 129],[30, 155],[31, 126],[32, 127],[33, 127],[34, 126]])

export const light_accent_SliderTrackActive = n95
export const light_active_accent_SliderTrackActive = n95
export const light_disabled_accent_SliderTrackActive = n95
export const light_dim_accent_SliderTrackActive = n95
export const light_error_accent_SliderTrackActive = n95
export const light_warning_accent_SliderTrackActive = n95
export const light_success_accent_SliderTrackActive = n95
const n96 = t([[0, 138],[1, 138],[11, 133],[15, 15],[16, 131],[17, 139],[18, 128],[19, 128],[20, 138],[22, 143],[23, 123],[24, 32],[25, 142],[26, 139],[27, 123],[28, 140],[29, 19],[31, 125],[32, 124],[33, 124],[34, 127]])

export const dark_accent_Card = n96
export const dark_accent_Progress = n96
export const dark_accent_DrawerFrame = n96
export const dark_accent_TooltipArrow = n96
export const dark_active_accent_Card = n96
export const dark_active_accent_Progress = n96
export const dark_active_accent_DrawerFrame = n96
export const dark_active_accent_TooltipArrow = n96
export const dark_disabled_accent_Card = n96
export const dark_disabled_accent_Progress = n96
export const dark_disabled_accent_DrawerFrame = n96
export const dark_disabled_accent_TooltipArrow = n96
export const dark_dim_accent_Card = n96
export const dark_dim_accent_Progress = n96
export const dark_dim_accent_DrawerFrame = n96
export const dark_dim_accent_TooltipArrow = n96
export const dark_error_accent_Card = n96
export const dark_error_accent_Progress = n96
export const dark_error_accent_DrawerFrame = n96
export const dark_error_accent_TooltipArrow = n96
export const dark_warning_accent_Card = n96
export const dark_warning_accent_Progress = n96
export const dark_warning_accent_DrawerFrame = n96
export const dark_warning_accent_TooltipArrow = n96
export const dark_success_accent_Card = n96
export const dark_success_accent_Progress = n96
export const dark_success_accent_DrawerFrame = n96
export const dark_success_accent_TooltipArrow = n96
const n97 = t([[0, 138],[1, 15],[11, 131],[15, 133],[16, 134],[17, 32],[18, 128],[19, 128],[20, 138],[21, 156],[22, 141],[23, 124],[24, 142],[25, 143],[26, 32],[27, 19],[28, 139],[29, 140],[30, 156],[31, 126],[32, 125],[33, 125],[34, 128]])

export const dark_accent_Input = n97
export const dark_accent_Checkbox = n97
export const dark_accent_TextArea = n97
export const dark_accent_RadioGroupItem = n97
export const dark_active_accent_Input = n97
export const dark_active_accent_Checkbox = n97
export const dark_active_accent_TextArea = n97
export const dark_active_accent_RadioGroupItem = n97
export const dark_disabled_accent_Input = n97
export const dark_disabled_accent_Checkbox = n97
export const dark_disabled_accent_TextArea = n97
export const dark_disabled_accent_RadioGroupItem = n97
export const dark_dim_accent_Input = n97
export const dark_dim_accent_Checkbox = n97
export const dark_dim_accent_TextArea = n97
export const dark_dim_accent_RadioGroupItem = n97
export const dark_error_accent_Input = n97
export const dark_error_accent_Checkbox = n97
export const dark_error_accent_TextArea = n97
export const dark_error_accent_RadioGroupItem = n97
export const dark_warning_accent_Input = n97
export const dark_warning_accent_Checkbox = n97
export const dark_warning_accent_TextArea = n97
export const dark_warning_accent_RadioGroupItem = n97
export const dark_success_accent_Input = n97
export const dark_success_accent_Checkbox = n97
export const dark_success_accent_TextArea = n97
export const dark_success_accent_RadioGroupItem = n97
const n98 = t([[0, 139],[1, 32],[11, 143],[15, 142],[16, 141],[17, 15],[18, 140],[19, 140],[20, 139],[21, 156],[22, 134],[23, 127],[24, 133],[25, 131],[26, 15],[27, 127],[28, 138],[29, 128],[30, 156],[31, 125],[32, 126],[33, 126],[34, 140]])

export const dark_accent_Tooltip = n98
export const dark_accent_SliderThumb = n98
export const dark_accent_SwitchThumb = n98
export const dark_accent_ProgressIndicator = n98
export const dark_active_accent_Tooltip = n98
export const dark_active_accent_SliderThumb = n98
export const dark_active_accent_SwitchThumb = n98
export const dark_active_accent_ProgressIndicator = n98
export const dark_disabled_accent_Tooltip = n98
export const dark_disabled_accent_SliderThumb = n98
export const dark_disabled_accent_SwitchThumb = n98
export const dark_disabled_accent_ProgressIndicator = n98
export const dark_dim_accent_Tooltip = n98
export const dark_dim_accent_SliderThumb = n98
export const dark_dim_accent_SwitchThumb = n98
export const dark_dim_accent_ProgressIndicator = n98
export const dark_error_accent_Tooltip = n98
export const dark_error_accent_SliderThumb = n98
export const dark_error_accent_SwitchThumb = n98
export const dark_error_accent_ProgressIndicator = n98
export const dark_warning_accent_Tooltip = n98
export const dark_warning_accent_SliderThumb = n98
export const dark_warning_accent_SwitchThumb = n98
export const dark_warning_accent_ProgressIndicator = n98
export const dark_success_accent_Tooltip = n98
export const dark_success_accent_SliderThumb = n98
export const dark_success_accent_SwitchThumb = n98
export const dark_success_accent_ProgressIndicator = n98
const n99 = t([[0, 138],[1, 128],[11, 15],[15, 138],[16, 133],[17, 140],[18, 128],[19, 128],[20, 138],[22, 142],[23, 124],[24, 139],[25, 32],[26, 140],[27, 124],[28, 19],[29, 123],[31, 126],[32, 125],[33, 125],[34, 126]])

export const dark_accent_SliderTrack = n99
export const dark_accent_TooltipContent = n99
export const dark_active_accent_Button = n99
export const dark_active_accent_Switch = n99
export const dark_active_accent_SliderTrack = n99
export const dark_active_accent_TooltipContent = n99
export const dark_disabled_accent_Button = n99
export const dark_disabled_accent_Switch = n99
export const dark_disabled_accent_SliderTrack = n99
export const dark_disabled_accent_TooltipContent = n99
export const dark_dim_accent_Button = n99
export const dark_dim_accent_Switch = n99
export const dark_dim_accent_SliderTrack = n99
export const dark_dim_accent_TooltipContent = n99
export const dark_error_accent_Button = n99
export const dark_error_accent_Switch = n99
export const dark_error_accent_SliderTrack = n99
export const dark_error_accent_TooltipContent = n99
export const dark_warning_accent_Button = n99
export const dark_warning_accent_Switch = n99
export const dark_warning_accent_SliderTrack = n99
export const dark_warning_accent_TooltipContent = n99
export const dark_success_accent_Button = n99
export const dark_success_accent_Switch = n99
export const dark_success_accent_SliderTrack = n99
export const dark_success_accent_TooltipContent = n99
const n100 = t([[0, 139],[1, 140],[11, 32],[15, 139],[16, 142],[17, 128],[18, 140],[19, 140],[20, 139],[21, 156],[22, 133],[23, 125],[24, 138],[25, 15],[26, 128],[27, 125],[28, 127],[29, 126],[30, 156],[31, 123],[32, 124],[33, 124],[34, 123]])

export const dark_accent_SliderTrackActive = n100
export const dark_active_accent_SliderTrackActive = n100
export const dark_disabled_accent_SliderTrackActive = n100
export const dark_dim_accent_SliderTrackActive = n100
export const dark_error_accent_SliderTrackActive = n100
export const dark_warning_accent_SliderTrackActive = n100
export const dark_success_accent_SliderTrackActive = n100