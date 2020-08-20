const baseURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&`;

export default {
    page: 1,
    query: '',

    apiService() {
        const requestParams = `&q=${this.query}&page=${this.page}&per_page=12&`;
        const key = '&key=17954920-9f227a1daed453cc6ffe90c05';
        return fetch(baseURL + requestParams + key).then(res => res.json())
        .then(data => {this.nextPage();
        console.log(data);
        return data.this})
        .catch(error => console.log(error))
    },
    nextPage() {
        this.page += 1;
    },

    get searchQuery() {
        return this.query;
    },
    set searchQuery(string) {
        this.query = string;
    },
    resetPage() {
        this.page = 1;
    },
};