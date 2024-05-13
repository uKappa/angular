export interface Rule {
    ruleName: string,
    ruleLevel: string,
    passed: number,
    warning: number,
    failed: number,
    inapplicable: number
    outcome: string
}