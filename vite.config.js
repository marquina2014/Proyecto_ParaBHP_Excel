import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
/*   base: "https://prod2-03.brazilsouth.logic.azure.com:443/workflows/313beadf255246d3bf64a7e89ead4062/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=i4ggp4ceQc7s3T9ISrGGTGgKNby0YdOrb1UnBEQTUwQ&path="
 */
})
