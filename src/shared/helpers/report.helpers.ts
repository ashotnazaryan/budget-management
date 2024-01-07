import { Locale, Report, ReportDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapReport = (report: ReportDTO, locale: Locale['isoIntl'], showDecimals = false): Report => {
  return {
    ...report,
    // TODO: use generic rule for currencyIso
    total: mapNumberToCurrencyString(report.total, report.reports[0].currencyIso, locale, showDecimals),
    limit: report.limit ? mapNumberToCurrencyString(report.limit, report.reports[0].currencyIso, locale, showDecimals) : ''
  };
};
