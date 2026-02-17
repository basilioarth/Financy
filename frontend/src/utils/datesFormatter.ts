import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (originalDate: string, yearsFormat: string): string => {
    const date = parseISO(originalDate);
    const formattedDate = format(date, `dd/MM/${yearsFormat}`, { locale: ptBR });

    return formattedDate
}

export const transformDateToPeriod = (date: Date): string => {
    return format(date, "LLLL '/' yyyy", { locale: ptBR }).replace(/^(.)/, c => c.toUpperCase());
}

export const formatPeriod = (period: string) => {
    let month = undefined
    let year = undefined

    if (period) {
        const periodMatch = period.match(/(\p{L}+)\s*\/\s*(\d{4})/u);

        if (periodMatch) {
            const monthName = periodMatch[1];

            // Mapear nome do mês para número (1-12)
            const monthMap: { [key: string]: number } = {
                'janeiro': 1, 'fevereiro': 2, 'março': 3, 'abril': 4,
                'maio': 5, 'junho': 6, 'julho': 7, 'agosto': 8,
                'setembro': 9, 'outubro': 10, 'novembro': 11, 'dezembro': 12
            };

            month = monthMap[monthName.toLowerCase()];
            year = parseInt(periodMatch[2]);
        }
    }

    return { month, year }
}