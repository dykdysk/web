let DonutsData = {
    promotions: [],
    boxes: [],
    catalog: []
};

class DataService {
    static api = new ApiService();
    static isDataLoaded = false;

    static async loadAllData() {
        if (this.isDataLoaded) {
            console.log('Data already loaded');
            return DonutsData;
        }
        
        try {
            console.log('Loading data from API...');

            const [promotions, boxes, catalog] = await Promise.all([
                this.api.getAll('promotions'),
                this.api.getAll('boxes'),
                this.api.getAll('donuts')
            ]);
            
            DonutsData = {
                promotions: promotions,
                boxes: boxes,
                catalog: catalog
            };
            
            this.isDataLoaded = true;
            console.log('Data loaded successfully:', DonutsData);
            return DonutsData;
            
        } catch (error) {
            console.error('Failed to load data from API:', error);
            return DonutsData;
        }
    }
    static async getData() {
        if (!this.isDataLoaded) {
            await this.loadAllData();
        }
        return DonutsData;
    }
}