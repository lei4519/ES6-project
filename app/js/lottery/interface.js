import $ from 'jquery'

class Interface {
    getOmit(issue) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/omit',
                data: { issue },
                dataType: 'json',
                success: (res) => {
                    this.setOmit(res.data)
                    resolve.call(this, res)
                },
                error: (err) => {
                    reject.call(this, err)
                }
            })
        })
    }

    getOpenCode(issue) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/opencode',
                data: { issue },
                dataType: 'json',
                success: (res) => {
                    this.setOpenCode(res.data)
                    resolve.call(this, res)
                },
                error: (err) => {
                    reject.call(this, err)
                }
            })
        })
    }

    getState(issue) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/state',
                data: { issue },
                dataType: 'json',
                success: (res) => {
                    resolve.call(this, res)
                },
                error: (err) => {
                    reject.call(this, err)
                }
            })
        })
    }
}

export default Interface
