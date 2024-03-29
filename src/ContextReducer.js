import React, {useReducer, useState} from 'react'
import { sortTransactions, wrapDateString, getStartTimeString } from './DataProcessUtils'
export const ParamContext = React.createContext()

/* context state doc
    email: String - user email
    name: String - name
    identity: String - 'consultant', 'student', 'pending'(wait for validation)
    meetings: Object - info of loaded meetings grouped by year/month -> {year: {month: [...]}}
    furture/finished/cancelled Meetings: [Object] - meetings grouped by different status
    receipts: [Object] - info of loaded meetings
*/

const initState = {
    id: '',
    announcements: {unreadCount: 0, list: []},
    notifications: {unreadCount: 0, list: []},
    identity: '',
    mobile: '',
    meetingsByTime: {},
    meetingsByStatus: {future: [], past: [], cancelled: []},
    purse: {
        balance: 0, withdrawn: 0, transaction: [], bankList: []
    },
    profile: {
        count: 0, email: '', emailVerified: false, experiences: '', intro: '', field: [], labels: [], mobile: '', mobileVerified: true,
        major: '', name: '', surname: '', school: '', year: '', studentCardVerified: false, timetable: [],
    },
    withdrawableAmount: 0,
    withdrawedAmount: 0,
    list: {
        consultants: [],
    },
    filterResult: [],
    tmpViewForStd: {
        count: 0, email: '', emailVerified: false, experiences: '', intro: '', field: [], labels: [], mobile: '', mobileVerified: true,
        major: '', name: '', surname: '', school: '', year: '', studentCardVerified: false, timetable: [[],[],[],[],[],[],[]],
    },
    tmpBookingForStd: { 
        count: 0, email: '', field: [], labels: [], major: '', mobile: '', name: '', 
        photo: 'NotFound', price: 200, school: '', surname: '', year: '',
        timetable: [[], [], [], [], [], [], []]
    }
}

const sumAmount = (type, list) => {
    let sum = 0
    for (var element in list) {
        if (list[element].paystatus === type) sum += list[element].amount
    }
    return sum
}

const editProfile = (init, changes) => {
    let update = { ...init }
    for (let key in changes) {
        if (key === 'studentIdScan') continue
        update[key] = changes[key]
    }
    return update
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'register':
            return {
                ...state, 
                id: action.payload.id,
                announcements: action.payload.announcements,
                identity: action.payload.identity,
                meetingsByTime: action.payload.meetingsByTime,
                meetingsByStatus: action.payload.meetingsByStatus,
                purse: action.payload.purse,
                profile: action.payload.profile,
                notifications: action.payload.notifications,
            }
        case 'login':
            console.debug(action.payload.announcements)
            let source = {
                id: action.payload.id,
                announcements: action.payload.announcements,
                identity: action.payload.identity,
                meetingsByTime: action.payload.meetingsByTime,
                meetingsByStatus: action.payload.meetingsByStatus,
                meetingsByStudentRecord: action.payload.meetingsByStudentRecord,
                purse: {
                    ...action.payload.purse,
                    transactions: sortTransactions(action.payload.purse.transactions)
                },
                profile: action.payload.profile,
                notifications: action.payload.notifications,
                withdrawableAmount: sumAmount('未提領', action.payload.purse.transactions),
                withdrawedAmount: sumAmount('已提領', action.payload.purse.transaction),
                list: (action.payload.list===undefined)? {}:action.payload.list,
            }
            Object.assign(state, source)
            return {
                ...state
            }
        case 'editProfile':
            return {
                ...state,
                profile: editProfile(state.profile, action.payload)
            }
        case 'editTimetable':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    timetable: action.payload
                }
            }
        case 'addMonthForView':
            return {
                ...state,
                meetingsByTime: action.payload
            }
        case 'updateAvatar':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photo: action.payload.photo
                }
            }
        case 'readNotification':
            return {
                ...state,
                notifications: {
                    unreadCount: state.notifications.unreadCount-1,
                    list: state.notifications.list.map((e)=>{
                        let k = {...e}
                        if (e.id === action.payload.nid) {
                            k.read = true
                        }
                        return k
                    })
                }
            }
        case 'selectBooking':
            return {
                ...state,
                toBook: {
                    ...action.payload
                }
            }
        case 'setCoupon':
            return {
                ...state,
                toBook: {
                    ...state.toBook,
                    coupon: action.payload.coupon
                }
            }
        case 'saveFilterResult':
            return {
                ...state, 
                filterResult: action.payload.filterResult
            }
        case 'deleteSingleListItem':
            return {
                ...state,
                list: {
                    consultants: state.list.consultants.filter((e) => (action.payload.deleteId !== e.id))
                }
            }
        case 'clearList':
            return {
                ...state,
                list: {
                    consultants: []
                }
            }
        case 'addToList':
            return {
                ...state,
                list: {
                    consultants: [...state.list.consultants, action.payload.newConsultant]
                }
            }
        case 'storePreviewData':
            return {
                ...state,
                tmpViewForStd: action.payload
            }
        case 'storeStudentBookingSlot': 
            return {
                ...state,
                tmpBookingForStd: action.payload
            }
        case 'updatePaymentDate':
            for (let idx in state.meetingsByStudentRecord) {
                console.debug(state.meetingsByStudentRecord[idx].meetingId)
                if (state.meetingsByStudentRecord[idx].meetingId === action.payload.meetingId) {
                    state.meetingsByStudentRecord[idx].meetingPaymentTime = wrapDateString(action.payload.meetingPaymentTime)+getStartTimeString(action.payload.meetingPaymentTime)
                }
            }
            return { ...state }
        case 'logout':
            return { ...initState }
        case 'passwordResetEmail':
            console.log(action)
            state.passwordResetEmail = action.payload.passwordResetEmail
            console.log(state)
            return { ...state }
        default:
            return state
    }
}

const ContextReducer = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)
    const [login, setLogin] = useState(false)

    return (
        <ParamContext.Provider value={{Info: state, setInfo: dispatch, isLogin: login, setLogin: setLogin}}>
            {children}
        </ParamContext.Provider>
    )
}

export default ContextReducer