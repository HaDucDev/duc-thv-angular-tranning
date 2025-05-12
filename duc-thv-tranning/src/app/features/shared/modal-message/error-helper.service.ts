import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHelperService {

    constructor() { }

    getMessage(validationMessages: any, key: string, field: string, extra?: any, fieldName?: string): string {
        let messageTemplate = validationMessages[key];
        if (key === 'pattern') {
            const patternMessages = validationMessages.pattern || {};
            messageTemplate = patternMessages[fieldName] || patternMessages.default || '{field} format is invalid.';
        }

        if (messageTemplate) {
            let message = messageTemplate.replace('{field}', field);
            if (extra && typeof extra === 'object') {
                for (const k in extra) {
                    message = message.replace(`{${k}}`, extra[k]);
                }
            }
            return message;
        }

        return `${field} is invalid.`;
    }

}
