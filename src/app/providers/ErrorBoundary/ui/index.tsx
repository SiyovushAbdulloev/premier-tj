import React, {Suspense} from "react"
import {PageError} from 'src/shared/ui/PageError'

class ErrorBoundary extends React.Component {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error: any) {
        return {hasError: true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log({error, errorInfo})
    }

    render() {
        // @ts-ignore
        const {hasError} = this.state
        // @ts-ignore
        const {children} = this.props
        if (hasError) {
            return (
                <Suspense fallback={'Loading...'}>
                    <PageError/>
                </Suspense>
            )
        }

        return children
    }
}

export default ErrorBoundary
