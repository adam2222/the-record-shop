import { connect } from 'react-redux'
import Albums from '../components/Albums'

const mapStateToProps = ({ albums }) => ({ albums })

export default connect(mapStateToProps)(Albums)
