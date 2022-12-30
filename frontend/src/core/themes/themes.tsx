
import { createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../core/store/store'

const Dashboardtheme = () => {
    const { theme } = useSelector((state: RootState) => state.home)
    const Theme = createTheme({
        palette: {
            mode: theme as PaletteMode,
        },
    });
return Theme
}
export {Dashboardtheme}