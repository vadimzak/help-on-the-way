import { Validator } from 'vee-validate'
import address from './addrssValidator'

Validator.extend('address', address)