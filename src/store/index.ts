import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import router from '@/router'

Vue.use(Vuex) // 把 store 绑到 Vue.prototype.$store = store



const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createRecordError: null,
    createTagError: null,
    user: {
      nickname: '爱吃猫的鱼',
      gender: '男',
      tel: '13912345678'
    }
  } as RootState,
  mutations: {
    fetchUser(state) {
      state.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')!) : state.user
    },
    saveUser(state) {
      window.localStorage.setItem('user', JSON.stringify(state.user))
      window.alert('保存成功')
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]')
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', { name: 'food', value: '餐饮' })
        store.commit('createTag', { name: 'play', value: '娱乐' })
        store.commit('createTag', { name: 'sports', value: '运动' })
        store.commit('createTag', { name: 'shopping', value: '购物' })
        store.commit('createTag', { name: 'traffic', value: '交通' })
      }
    },
    setCurrentTag(state, name: string) {
      state.currentTag = state.tagList.filter(t => t.name === name)[0];
    },
    createTag(state, payload: Tag) {
      state.createTagError = null
      const names = state.tagList.map((item: any) => item.name)
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated')
        return
      }
      state.tagList.push(payload)
      store.commit('saveTags')
    },
    removeTag(state, name: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].name === name) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
    updateTag(state, payload: Tag) {
      const { name, value } = payload
      const nameList = state.tagList.map(item => item.name)
      if (nameList.indexOf(name) >= 0) {
        const values = state.tagList.map(item => item.value)
        if (values.indexOf(value) >= 0) {
          window.alert('标签名称重复了')
          return
        }
      } else {
        state.tagList.push(payload)
        store.commit('saveTags')
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
  },
})


export default store