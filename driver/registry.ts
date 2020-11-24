import { Tracer } from 'opentracing'
import { BaseLogger } from 'pino'
import { ConfigProvider } from '../config/provider'
import { Registry as CoreRegistry } from '../core/registry'
import { HandlerProvider } from '../handler/provider'
export interface Registry extends CoreRegistry {
	tracer(): Tracer
	withConfig(c: ConfigProvider): Registry
	withLogger(l: BaseLogger): Registry
	init(): void
	handler(): HandlerProvider
}

export const callRegistry = (r: Registry) => {
	r.tracer()
}
