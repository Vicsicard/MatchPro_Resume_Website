-- Create table for error logs
CREATE TABLE IF NOT EXISTS error_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    error_message TEXT NOT NULL,
    error_stack TEXT,
    error_type TEXT NOT NULL,
    severity TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    url TEXT,
    user_agent TEXT
);

-- Create table for application metrics
CREATE TABLE IF NOT EXISTS application_metrics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metric_name TEXT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    tags JSONB,
    user_id UUID REFERENCES auth.users(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_error_logs_timestamp ON error_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_error_logs_type ON error_logs(error_type);
CREATE INDEX IF NOT EXISTS idx_error_logs_severity ON error_logs(severity);
CREATE INDEX IF NOT EXISTS idx_error_logs_user_id ON error_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON application_metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_name ON application_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_metrics_user_id ON application_metrics(user_id);

-- Set up Row Level Security (RLS)
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for error_logs
CREATE POLICY "Allow insert for authenticated users" ON error_logs
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow read access for admin users" ON error_logs
    FOR SELECT TO authenticated
    USING (auth.uid() IN (
        SELECT user_id FROM user_roles WHERE role = 'admin'
    ));

-- Create policies for application_metrics
CREATE POLICY "Allow insert for authenticated users" ON application_metrics
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow read access for admin users" ON application_metrics
    FOR SELECT TO authenticated
    USING (auth.uid() IN (
        SELECT user_id FROM user_roles WHERE role = 'admin'
    ));
