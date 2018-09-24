
import Base from './lottery/base.js'
import Timer from './lottery/timer.js'
import Calculate from './lottery/calculate.js'
import Interface from './lottery/interface.js'
import $ from 'jquery'

const copyProperties = function (target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, desc)
        }
    }
}

const mix = function (...mixins) {
    class Mix { }
    for (let mixin of mixins) {
        copyProperties(Mix, mixin)
        copyProperties(Mix.prototype, mixin.prototype)
    }
    return Mix
}

class Lottery extends mix(Base, Calculate, Interface, Timer) {
    constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
        super()
        this.name = name
        this.cname = cname
        this.issue = issue
        this.state = state
        this.el = ''
        this.omit = new Map()
        this.open_code = new Set()
        this.open_code_list = new Set()
        this.play_list = new Map()
        this.number = new Set()
        this.issue_el = '#curr_issue'
        this.countdown_el = '#countdown'
        this.state_el = '.state_el'
        this.cart_el = '.codelist'
        this.omit_el = ''
        this.cur_play = 'r5'
        this.initPlayList()
        this.initNumber()
        this.updateState()
        this.initEvent()
    }
    updateState() {
        this.getState().then(res => {
            this.issue = res.issue
            this.end_time = res.end_time
            this.state = res.state
            $(this.issue_el).text(res.issue)
            this.countdown(res.end_time, (time) => {
                $(this.countdown_el).html(time)
            }, () => {
                setTimeout(() => {
                    this.updateState()
                    this.getOmit(this.issue).then(res => {

                    })
                    this.getOpenCode(this.issue).then(res => {

                    })
                }, 500);
            })
        })
    }

    initEvent() {
        $('#plays').on('click', 'li', this.changePlayNav.bind(this))
        $('.boll-list').on('click', '.btn-boll', this.toggleCodeActive.bind(this))
        $('#confirm_sel_code').on('click', this.addCode.bind(this))
        $('.dxjo').on('click', 'li', this.assisHandel.bind(tihs))
        $('.qkmethod').on('click', '.btn-middle', this.getRandomCode.bind(this))
    }
}

export default Lottery