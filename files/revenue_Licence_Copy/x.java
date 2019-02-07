@Configuration
@EnableBatchProcessing
public Division() {
    }

    public Division(Integer id, String divisionName, Integer districtId, Integer status) {
        this.id = id;
        this.divisionName = divisionName;
        this.districtId = districtId;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDivisionName() {
        return divisionName;
    }

    public void setDivisionName(String divisionName) {
        this.divisionName = divisionName;
    }

    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Division{" +
                "id=" + id +
                ", divisionName='" + divisionName + '\'' +
                ", districtId=" + districtId +
                ", status=" + status +
                '}';
    }
}
public class BatchConfiguration {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    public DataSource dataSource;

    @Bean
    public FlatFileItemReader<Division> reader() {
        FlatFileItemReader<Division> reader = new FlatFileItemReader<Division>();
        reader.setResource(new ClassPathResource("x.csv"));
        reader.setLineMapper(new DefaultLineMapper<Division>() {{
            setLineTokenizer(new DelimitedLineTokenizer() {{
                setNames(new String[] { "id", "divisionName","districtId","status" });
            }});
            setFieldSetMapper(new BeanWrapperFieldSetMapper<Division>() {{
                setTargetType(Division.class);
            }});
        }});
        return reader;
    }

    @Bean
    public DivisionItemProcessor processor() {
        return new DivisionItemProcessor();
    }


    @Bean
    public JdbcBatchItemWriter<Division> writer() {
        JdbcBatchItemWriter<Division> writer = new JdbcBatchItemWriter<Division>();
        writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<Division>());


                writer.setSql("INSERT INTO status0 (Id, division_name,district_id,status) VALUES (:id, :divisionName,:districtId,:status)");
                writer.setDataSource(dataSource);
                return writer;
            }



    @Bean
    public Job importUserJob(JobCompletionNotificationListener listener) {
        return jobBuilderFactory.get("importUserJob")
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                .flow(step1())
                .end()
                .build();
    }



    @Bean
    public Step step1() {
        return stepBuilderFactory.get("step1")
                .<Division, Division> chunk(10)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }
}

@Override
    public void afterJob(JobExecution jobExecution) {
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            List<Division> results = jdbcTemplate.query("SELECT Id, division_name,district_id,status FROM table1 where status=1", new RowMapper<Division>() {

                @Override
                public Division mapRow(ResultSet rs, int row) throws SQLException {

                    return new Division(rs.getInt(1), rs.getString(2),rs.getInt(3),rs.getInt(4));
                }

            });

            System.out.println(results);

            for (Division division : results) {
                log.info("Found <" + division + "> in the database.");
            }

        }
    }


public class DivisionItemProcessor implements ItemProcessor<Division, Division> {

    private static final Logger log = LoggerFactory.getLogger(DivisionItemProcessor.class);

    @Override
    public Division process(final Division division) throws Exception {
        final String divisionName = division.getDivisionName().toUpperCase();

        final Division transformedDivision = new Division(division.getId(), divisionName,division.getDistrictId(),division.getStatus());

        log.info("Converting (" + division + ") into (" + transformedDivision + ")");

        return transformedDivision;
    }

public class Division implements Serializable {

    private static final long serialVersionUID = -6402068923614583448L;
    private Integer id;
    private String divisionName;
    private Integer districtId;
    private Integer status;

    