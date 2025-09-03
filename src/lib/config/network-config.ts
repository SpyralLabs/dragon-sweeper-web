import { Config } from '@/lib/config/env-config';
import { abstractTestnet, abstract } from 'viem/chains';

export const SUPPORTED_NETWORK = Config.ENV === 'DEV' ? abstractTestnet : abstract;
