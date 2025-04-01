package lt.braineater.itmo.web3.utils;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import lt.braineater.itmo.web3.beans.FormBean;
import lt.braineater.itmo.web3.model.Attempt;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

@ApplicationScoped
public class DatabaseManager {
    private static final Logger logger = Logger.getLogger(DatabaseManager.class.getName());

    private String url = "jdbc:postgresql://database:5432/Web3";
    private String user = "admin";
    private String password = "admin";


//    @PostConstruct
//    private void loadDatabaseConfig() {
//        Properties properties = new Properties();
//        try (InputStream input = getClass().getClassLoader().getResourceAsStream("db_helios.properties")) {
//            if (input == null) {
//                logger.warning("Не найден файл конфигурации, программист петух!");
//                return;
//            }
//            properties.load(input);
//            //url = properties.getProperty("url");
//            //user = properties.getProperty("user");
//            //password = properties.getProperty("password");
//        } catch (IOException ex) {
//            if(ex.getMessage() != null) logger.warning(ex.getMessage());
//        }
//    }

    @PostConstruct
    private void createTables(){
        try (Connection connection = connect()){
            if(connection == null) throw new NullPointerException();

            PreparedStatement creating = connection.prepareStatement(QueryDealer.CREATE_TABLES);
            creating.executeQuery();

        } catch (SQLException | NullPointerException e){
            if(e.getMessage() != null) logger.warning(e.getMessage());
        }
    }

    private Connection connect(){
        try{
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection(this.url, this.user, this.password);
        } catch (ClassNotFoundException e) {
            logger.severe("Драйвер не найден");
        } catch (SQLException e) {
            logger.severe("Ошибка при подключении к базе данных: " + e.getMessage());
            logger.severe(String.valueOf(e.getClass()));
            logger.warning("Код ошибки: " + e.getErrorCode());
            logger.warning("Статус SQL: " + e.getSQLState());
        }
        return null;
    }

    public List<Attempt> getAttempts(){
        var data = new LinkedList<Attempt>();

        try (Connection connection = connect()){
            if(connection == null) throw new NullPointerException();

            PreparedStatement selectAll = connection.prepareStatement(QueryDealer.SELECT_ALL_ATTEMPTS);
            ResultSet resultSet = selectAll.executeQuery();

            while (resultSet.next()) {
                var attempt = new Attempt(
                    resultSet.getFloat("x"),
                    resultSet.getFloat("y"),
                    resultSet.getInt("r"),
                    resultSet.getBoolean("hit"),
                    resultSet.getString("curr_time")
                );

                data.add(attempt);
            }

            logger.info("CHINAZES!!!");
        } catch (SQLException | NullPointerException e){
            if(e.getMessage() != null) logger.warning(e.getMessage());
        }

        return data;
    }

    public void addAttempt(Attempt attempt){
        try (Connection connection = connect()){
            if(connection == null) throw new NullPointerException();

            PreparedStatement insert = connection.prepareStatement(QueryDealer.INSERT_ATTEMPT);

            insert.setFloat(1, attempt.getX());
            insert.setFloat(2, attempt.getY());
            insert.setInt(3, attempt.getR());
            insert.setBoolean(4, attempt.getHit());
            insert.setString(5, attempt.getCurrTime());

            insert.executeQuery();
            logger.info("CHINAZES!!!");
        } catch (SQLException | NullPointerException e){
            if(e.getMessage() != null) logger.warning(e.getMessage());
        }
    }
}
