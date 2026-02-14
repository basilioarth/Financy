import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (originalDate: string, yearsFormat: string): string => {
    const date = parseISO(originalDate);
    const formattedDate = format(date, `dd/MM/${yearsFormat}`, { locale: ptBR });

    return formattedDate
}