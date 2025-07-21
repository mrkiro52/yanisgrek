export async function fetchMaintenanceServices(seriesId) {
    const url = `http://89.104.65.124/api/maintenance-services/?series_id=${seriesId}`;
  
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Ошибка при запросе услуг для series_id=${seriesId}: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`[fetchMaintenanceServices] ${error.message}`);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  }
  