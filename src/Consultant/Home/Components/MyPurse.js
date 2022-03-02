import { useContext } from 'react'
import moneySign from '../img/$.png'
import '../clt_home.css'
import { ParamContext } from '../../../ContextReducer'
import { Link } from 'react-router-dom'

const listBody = (receipt) => {
    if (receipt[0] === undefined) {
        return (
            <li className='clt_home-purse-empty-list'>目前尚未有任何明細!</li>
        )
    } else {
        return (
            receipt.map((e) => (
                <li className='clt_home-purse-list-out'>
                    <span className='clt_home-purse-list-out-date'>{e.consultime}</span>
                    <span className='clt_home-purse-list-out-name'>{e.student}</span>
                    <span className='clt_home-purse-list-out-amount'>{e.amount}元</span>
                </li>
            ))
        )
    }
}

const MyPurse = () => {
    const context = useContext(ParamContext)
    return (
        <div className='clt_home-purse'>
            <div className='clt_home-purse-title'>
                <img className='clt_home-purse-title-icon' src={moneySign} />
                <span className='clt_home-purse-title-text'>我的錢包</span>
            </div>
            <div className='clt_home-purse-list'>
                <div className='clt_home-purse-list-unwithdrawed'>
                    <p className='clt_home-purse-list-uwtext'>可提領金額</p>
                    <p className='clt_home-purse-list-amount'>
                        <span className='clt_home-purse-list-amount-num'>{context.Info.withdrawableAmount}</span>
                        元
                    </p>
                </div>
                <div className='clt_home-purse-list-sepline' />
                <div className='clt_home-purse-list-body'>
                    <ul className='clt_home-purse-list-body-ul'>
                        {listBody(context.Info.receipts.filter((e)=>(e.paystatus==='未提領')))}
                    </ul>
                </div>
                <button className='clt_home-purse-show-receipt'><Link to='/consultant-purse/receipt'>查看明細</Link></button>
                <button className='clt_home-purse-goto-withdraw'>前往提領</button>
            </div>
        </div>
    )
}

export default MyPurse