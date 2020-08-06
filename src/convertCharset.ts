// @ts-ignore
import OpenCC from 'opencc-js'

const convertT2S = OpenCC.Converter('t', 'cn')
const convertS2T = OpenCC.Converter('cn', 't')

export { convertT2S, convertS2T }
