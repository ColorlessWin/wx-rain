module.exports = Behavior({
  data: {
    total: -1,
    limit: 20,
    length: 0,
    empty: false,
    loading: false,
    _first_load: true,
    datas: [],
  },

  methods: {
    load() {
      let { _first_load, length, total, limit } = this.data
      if (!_first_load && length >= total) 
        return

      if (this.data.loading) 
        return

      this.data.loading = true  
      this.filling(length, limit).then(({ total, data, empty })=> {  
        if (empty) this.setData({ empty })
        if (this.data._first_load) this.setData({ total })
        this.data._first_load = false
        let datas = this.data.datas.concat(data)
        this.setData({ 
          datas,
          length: datas.length,
          loading: false
        })
      })
    },

    refresh() {
      this.setData({
        total: -1,
        length: 0,
        empty: false,
        loading: false,
        _first_load: true,
        datas: [],
      })
    },

    filling(offset, limit) {
      console.warn('not implemented \'filling(...)\' in \'pagination behavior\'')
      return Promise.reject()
    }
  }
})