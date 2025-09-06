import 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'

// Vuetifyの型補完が効かない場合に追加
declare module 'vuetify' {
    export interface IconOptions {
        defaultSet: string
        aliases: typeof aliases
        sets: {
            fa: typeof fa
        }
    }
}