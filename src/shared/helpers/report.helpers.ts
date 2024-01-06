import { Locale, Report, ReportDTO } from 'shared/models';

export const mapReports = (reports: ReportDTO[], locale: Locale['isoIntl'], showDecimals = false): Report[] => {
  return reports.map((report) => {
    return mapReport(report, locale, showDecimals);
  });
};

export const mapReport = (report: ReportDTO, locale: Locale['isoIntl'], showDecimals = false): Report => {
  return {
    ...report
  };
};
