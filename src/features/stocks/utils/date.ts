const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const formatUtcDate = (date: string, options: Intl.DateTimeFormatOptions) => {
  if (!ISO_DATE_PATTERN.test(date)) {
    return date;
  }

  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    ...options,
    timeZone: 'UTC',
  });
};

export const isIsoDateLabel = (date: string) => ISO_DATE_PATTERN.test(date);

export const formatChartShortDate = (date: string) =>
  formatUtcDate(date, {
    month: 'short',
    day: 'numeric',
  });

export const formatChartLongDate = (date: string) =>
  formatUtcDate(date, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const formatCoverageDate = formatChartLongDate;
